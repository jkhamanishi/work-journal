import "../../../assets/css/index.scss";

import JournalContainer from "./JournalContainer";
import { JournalContextProvider } from "../contexts/useJournalContext";


function App() {
  return (
    <JournalContextProvider>
      <JournalContainer />
    </JournalContextProvider>
  );
}

export default App;
