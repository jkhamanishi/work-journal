import { useEffect, useRef } from "react";
import { useJournalContext } from "../../hooks/useJournalContext";
import YearEntry from "./YearEntry";


function Journal() {
  const {dict} = useJournalContext();
  const firstLoad = useRef(0);
  
  useEffect(() => {
    if (firstLoad.current <= 1) {
      const root = document.getElementById("root")!;
      root.scrollTop = root.scrollHeight;
    }
    firstLoad.current += 1;
  }, [dict]);
  
  return (
    <ul id="journal">
      {Object.keys(dict).map((year) => (
        <YearEntry year={year} key={year} />
      ))}
    </ul>
  );
}


export default Journal;
