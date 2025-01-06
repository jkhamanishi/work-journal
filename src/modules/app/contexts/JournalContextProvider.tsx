import * as yaml from "js-yaml";

import { type ReactNode, useEffect, useState } from 'react';
import { useJournalData } from "../hooks/useJournalData";
import { JournalFile } from "../utils/getSaveFile";

import { JournalContext, JournalContextType } from "./useJournalContext";

function JournalContextProvider({children}: {children: ReactNode}) {
  const [file, setFile] = useState<JournalFile>();
  const [data, setData] = useJournalData();
  const [defaultProject, setDefaultProject] = useState("");
  
  async function updateFile() {
    if (file) {
      const content = yaml.dump(data);
      await file.write(content);
    }
  }
  
  useEffect(() => {
    updateFile();
  }, [data]);
  
  const context: JournalContextType = {
    file, setFile,
    data, setData,
    defaultProject, setDefaultProject,
  };
  
  return <JournalContext.Provider value={context}>{children}</JournalContext.Provider>;
}

export default JournalContextProvider;