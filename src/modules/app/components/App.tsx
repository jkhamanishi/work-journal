import "../../../assets/css/index.scss";

import JournalContainer from "./JournalContainer";
import JournalContextProvider from "../contexts/JournalContextProvider";


function App() {
  return (
    <JournalContextProvider>
      <JournalContainer />
    </JournalContextProvider>
  );
}

export default App;
