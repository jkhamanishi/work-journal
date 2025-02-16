import { createContext, useContext, ReactNode, useState } from 'react';
import { useJournalDict, JournalDict } from "./useJournalDict";
import { type JournalFile } from "../utils/IndexedDB";
import renderContextProvider from '../../../lib/react/renderContextProvider';

import * as yaml from "js-yaml";
import { useBoolean } from 'usehooks-ts';


interface JournalContextType {
  file?: JournalFile;
  setFile: (set: JournalFile) => void;
  dict: JournalDict;
  setDict: (set: JournalDict | ((old: JournalDict) => JournalDict)) => void;
  save: (manualSave?: boolean) => void;
  autoSave: boolean;
  toggleAutoSave: () => void;
  defaultProject: string
  setDefaultProject: (set: string | ((old: string) => string)) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalContextProvider({children}: {children: ReactNode}) {
  const [file, setFile] = useState<JournalFile>();
  const [dict, setDict] = useJournalDict();
  const {value: autoSave, toggle: toggleAutoSave} = useBoolean(true);
  const [defaultProject, setDefaultProject] = useState("Example Project");
  
  async function updateFile() {
    if (file) {
      const content = yaml.dump(dict);
      await file.write(content);
    }
  }
  
  function save(manualSave=false) {
    setDict({...dict});
    if (manualSave || autoSave) {
      updateFile();
    }
  }
  
  const context: JournalContextType = {
    file, setFile,
    dict, setDict,
    save, autoSave, toggleAutoSave,
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


