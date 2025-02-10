import { MouseEvent, useEffect } from "react";
import Settings from "./Settings";

import { useJournalContext } from "../hooks/useJournalContext";
import { JournalDict } from "../hooks/useJournalDict";

import * as yaml from "js-yaml";
import { downloadFile, uploadFile } from "../utils/IndexedDB";



function Header() {
  const {setFile, dict, setDict} = useJournalContext()
  
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
  async function loadFile(event?: MouseEvent) {
    const savedFile = await uploadFile(event?.isTrusted ?? false);
    if (!savedFile) {
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
  
  return (
    <header>
      <button onClick={saveFile}>Save File</button>
      <button onClick={loadFile}>Load File</button>
      <Settings />
    </header>
  );
}


export default Header;
