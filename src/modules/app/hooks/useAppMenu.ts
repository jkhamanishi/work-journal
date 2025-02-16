import { useAppContext } from "./useAppContext";
import useFontSize from "./useFontSize";
import { useJournalContext } from "./useJournalContext";
import useJournalFile from "./useJournalFile";



function useAppMenu() {
  const { loadFile: open, saveFile: saveAs } = useJournalFile();
  const { save: _save, file, autoSave, toggleAutoSave } = useJournalContext();
  const save = () => file ? _save(true) : saveAs();
  const { toggleShowSettings, showAppVersion } = useAppContext();
  const font = useFontSize();
  
  return {
    open, save, saveAs, autoSave, toggleAutoSave,
    toggleShowSettings,
    font,
    showAppVersion,
  }
}


export default useAppMenu;
