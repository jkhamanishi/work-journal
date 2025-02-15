import "../../../assets/css/index.scss";

import JournalContainer from "./JournalContainer";
import { JournalContextProvider } from "../hooks/useJournalContext";
import MenuBar from "./MenuBar";


function App() {
  return (
    <JournalContextProvider>
      <MenuBar />
      <JournalContainer />
    </JournalContextProvider>
  );
}

export default App;
