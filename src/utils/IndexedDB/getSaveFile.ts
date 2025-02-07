import * as IDB from "idb-keyval";


export class JournalFile {
  read: () => Promise<string>;
  write: (contents: string) => Promise<void>;
  
  constructor(file: File, fileHandle: FileSystemFileHandle) {
    this.read = async () => await file.text();
    this.write = async (contents: string) => {
      const writable = await fileHandle!.createWritable();
      await writable.write(contents);
      await writable.close();
    };
  }
  
  static async create(fileHandle?: FileSystemFileHandle) {
    if (fileHandle) {
      const file = await fileHandle.getFile();
      return new JournalFile(file, fileHandle);
    } else {
      return;
    }
  }
}

async function verifyPermission(fileHandle: FileSystemFileHandle) {
  if ((await fileHandle.queryPermission({mode: "readwrite"})) === "granted") {
    return true;
  } else if ((await fileHandle.requestPermission({mode: "readwrite"})) === "granted") {
    return true;
  } else {
    return false;
  }
}

export async function uploadFile(): Promise<JournalFile | undefined> {
  try {
    let retrievedFromIDB = false;
    let fileHandle = await IDB.get<FileSystemFileHandle>('file'); 
    if (fileHandle) {
      console.log(`Retrieved file handle "${fileHandle.name}" from IndexedDB.`);
      retrievedFromIDB = await verifyPermission(fileHandle);
    }
    if (!retrievedFromIDB) {
      [fileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'YAML Files',
          accept: {'text/yaml': ['.yaml' as const]},
        }]
      });
      await IDB.set('file', fileHandle); 
      console.log(`Stored file handle for "${fileHandle.name}" in IndexedDB.`);
      if (!(await verifyPermission(fileHandle))) {
        return;
      }
    }
    return await JournalFile.create(fileHandle);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

export async function downloadFile() {
  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "journal.yaml",
      types: [{
        description: 'YAML Files',
        accept: {'text/yaml': ['.yaml' as const]},
      }]
    });
    await IDB.set('file', fileHandle); 
    console.log(`Stored file handle for "${fileHandle.name}" in IndexedDB.`);
    
    return await JournalFile.create(fileHandle);
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert(error);
    }
  }
}


