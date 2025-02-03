import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useJournalData, JournalData } from "./useJournalData";
import { JournalFile } from "../utils/getSaveFile";
import renderContextProvider from '../../core/utils/renderContextProvider';

import * as yaml from "js-yaml";


interface JournalContextType {
  file?: JournalFile;
  setFile: (set: JournalFile) => void;
  data: JournalData;
  setData: (set: JournalData | ((old: JournalData) => JournalData)) => void;
  defaultProject: string
  setDefaultProject: (set: string | ((old: string) => string)) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalContextProvider({children}: {children: ReactNode}) {
  const [file, setFile] = useState<JournalFile>();
  const [data, setData] = useJournalData();
  const [defaultProject, setDefaultProject] = useState("Example Project");
  
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
  
  return renderContextProvider(JournalContext.Provider, context, children);
}

export function useJournalContext() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("JournalContextProvider element not found.");
  }
  return context;
}


