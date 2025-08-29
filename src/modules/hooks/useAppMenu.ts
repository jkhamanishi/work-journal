import { useAppContext } from "./useAppContext";
import useBranchWidth from "./useBranchWidth";
import useFontSize from "./useFontSize";
import { useJournalContext } from "./useJournalContext";
import useJournalFile from "./useJournalFile";



function useAppMenu() {
  const { loadFile: open, saveFile: saveAs } = useJournalFile();
  const { save: _save, file, autoSave, toggleAutoSave } = useJournalContext();
  const save = () => file ? _save(true) : saveAs();
  const { toggleShowSettings, showAppVersion } = useAppContext();
  const font = useFontSize();
  const branchWidth = useBranchWidth();
  
  return {
    open, save, saveAs, autoSave, toggleAutoSave,
    toggleShowSettings,
    font,
    branchWidth,
    showAppVersion,
  }
}


export default useAppMenu;
