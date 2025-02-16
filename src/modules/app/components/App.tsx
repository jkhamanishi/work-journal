import "../../../assets/css/index.scss";

import { AppContextProvider } from "../hooks/useAppContext";
import { JournalContextProvider } from "../hooks/useJournalContext";
import JournalContainer from "./JournalContainer";
import MenuBar from "./MenuBar";
import Settings from "./Settings";


function App() {
  return (
    <AppContextProvider>
      <JournalContextProvider>
        <MenuBar />
        <JournalContainer />
        <Settings />
      </JournalContextProvider>
    </AppContextProvider>
  );
}

export default App;
