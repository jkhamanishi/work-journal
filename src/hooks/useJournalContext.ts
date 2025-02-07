import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useJournalDict, JournalDict } from "./useJournalDict";
import { type JournalFile } from "../utils/IndexedDB";
import renderContextProvider from '../lib/react/renderContextProvider';

import * as yaml from "js-yaml";


interface JournalContextType {
  file?: JournalFile;
  setFile: (set: JournalFile) => void;
  dict: JournalDict;
  setDict: (set: JournalDict | ((old: JournalDict) => JournalDict)) => void;
  defaultProject: string
  setDefaultProject: (set: string | ((old: string) => string)) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalContextProvider({children}: {children: ReactNode}) {
  const [file, setFile] = useState<JournalFile>();
  const [dict, setDict] = useJournalDict();
  const [defaultProject, setDefaultProject] = useState("Example Project");
  
  async function updateFile() {
    if (file) {
      const content = yaml.dump(dict);
      await file.write(content);
    }
  }
  
  useEffect(() => {
    updateFile();
  }, [dict]);
  
  const context: JournalContextType = {
    file, setFile,
    dict, setDict,
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


