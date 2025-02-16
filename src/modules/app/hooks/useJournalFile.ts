import { useEffect } from "react";

import { useJournalContext } from "../hooks/useJournalContext";
import { JournalDict } from "../hooks/useJournalDict";

import * as yaml from "js-yaml";
import * as IDB from "idb-keyval";
import { downloadFile, uploadFile } from "../utils/IndexedDB";



function useJournalFile() {
  const {file, setFile, dict, setDict} = useJournalContext()
  
  async function saveFile() {
    const savedFile = await downloadFile();
    if (!savedFile) {
      return;
    } else {
      setFile(savedFile);
      const content = yaml.dump(dict);
      await savedFile.write(content);
    }
  }
  async function loadFile(event?: Event) {
    const oldFileHandle = await IDB.get<FileSystemFileHandle>('file'); 
    if (file) {
      await IDB.del('file');
    }
    const savedFile = await uploadFile(event?.isTrusted ?? false);
    if (!savedFile) {
      IDB.set('file', oldFileHandle);
      return;
    } else {
      setFile(savedFile);
      const data = yaml.load(await savedFile.read()) as JournalDict;
      setDict(data);
    }
  }
  
  useEffect(() => {
    loadFile();
  }, []);
  
  return { saveFile, loadFile }
}


export default useJournalFile;
