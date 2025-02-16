import { useJournalContext } from "./useJournalContext";
import useJournalFile from "./useJournalFile";



function useAppMenu() {
  const { loadFile: open, saveFile: saveAs } = useJournalFile();
  const { save: _save, file, autoSave, toggleAutoSave } = useJournalContext();
  
  const save = () => file ? _save(true) : saveAs();
  
  return {
    open, save, saveAs, autoSave, toggleAutoSave
  }
}


export default useAppMenu;
