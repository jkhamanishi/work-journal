import * as IDB from "idb-keyval";


export interface JournalFile {
  read: () => Promise<string>;
  write: (contents: string) => Promise<void>;
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

export async function getSaveFile(): Promise<JournalFile | undefined> {
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
    
    const file = await fileHandle!.getFile();
    return {
      read: async () => await file.text(),
      write: async (contents: string) => {
        const writable = await fileHandle!.createWritable();
        await writable.write(contents);
        await writable.close();
      }
    };
    
  } catch (error: any) {
    console.error(error.message);
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
    
    const file = await fileHandle.getFile();
    
    return {
      read: async () => await file.text(),
      write: async (contents: string) => {
        const writable = await fileHandle.createWritable();
        await writable.write(contents);
        await writable.close();
      },
    };
    
  } catch (error: any) {
    alert(error.message);
  }
}


