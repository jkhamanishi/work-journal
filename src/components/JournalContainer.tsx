import * as yaml from "js-yaml";

import { MouseEvent, useEffect } from "react";

import Journal from "./Journal";
import Settings from "./Settings";

import { useJournalContext } from "../hooks/useJournalContext";
import { JournalData } from "../hooks/useJournalData";

import { downloadFile, uploadFile } from "../utils/IndexedDB";

function JournalContainer() {
  const {setFile, data, setData} = useJournalContext()
  
  async function saveFile() {
    const savedFile = await downloadFile();
    if (!savedFile) {
      return;
    } else {
      setFile(savedFile);
      const content = yaml.dump(data);
      await savedFile.write(content);
    }
  }
  async function loadFile(event?: MouseEvent) {
    const savedFile = await uploadFile(event?.isTrusted ?? false);
    if (!savedFile) {
      return;
    } else {
      setFile(savedFile);
      const data = yaml.load(await savedFile.read()) as JournalData;
      setData(data);
    }
  }
  
  useEffect(() => {
    loadFile();
  }, []);
  
  return (
    <div id="container">
      <div id="title-bar" />
      <header>
        <button onClick={saveFile}>Save File</button>
        <button onClick={loadFile}>Load File</button>
        <Settings />
      </header>
      <Journal />
    </div>
  );
}


export default JournalContainer;