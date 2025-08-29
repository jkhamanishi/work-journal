import "../../../assets/css/index.scss";

import { AppContextProvider } from "../hooks/useAppContext";
import { JournalContextProvider } from "../hooks/useJournalContext";
import MenuBar from "./MenuBar";
import Journal from "./Journal";
import Settings from "./Settings";


function App() {
  return (
    <AppContextProvider>
      <JournalContextProvider>
        <MenuBar />
        <Journal />
        <Settings />
      </JournalContextProvider>
    </AppContextProvider>
  );
}

export default App;
