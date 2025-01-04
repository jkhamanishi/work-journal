import * as yaml from "js-yaml";

import { useEffect } from "react";

import Journal from "./Journal";
import Settings from "./Settings";

import { useJournalContext } from "../contexts/useJournalContext";
import { JournalData } from "../hooks/useJournalData";

import { downloadFile, getSaveFile } from "../utils/getSaveFile";

function JournalContainer() {
  const {setFile, data, setData} = useJournalContext()
  
  async function saveFile() {
    const saveFile = await downloadFile();
    if (!saveFile) {
      return;
    } else {
      setFile(saveFile);
      const content = yaml.dump(data);
      await saveFile.write(content);
    }
  }
  async function loadFile() {
    const saveFile = await getSaveFile();
    if (!saveFile) {
      return;
    } else {
      setFile(saveFile);
      const data = yaml.load(await saveFile.read()) as JournalData;
      setData(data);
    }
  }
  
  useEffect(() => {
    loadFile();
  }, []);
  
  return (
    <div id="container">
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