import { createContext, useContext } from 'react';
import { JournalData } from "../hooks/useJournalData";
import { JournalFile } from "../utils/getSaveFile";



export interface JournalContextType {
  file?: JournalFile;
  setFile: (set: JournalFile) => void;
  data: JournalData;
  setData: (set: JournalData | ((old: JournalData) => JournalData)) => void;
}

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function useJournalContext() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("JournalContextProvider element not found.");
  }
  return context;
}


