import { useEffect, useRef } from "react";
import { useJournalContext } from "../../hooks/useJournalContext";
import YearEntry from "./YearEntry";


function Journal() {
  const {dict} = useJournalContext();
  const firstLoad = useRef(0);
  
  useEffect(() => {
    if (firstLoad.current <= 2) {
      const container = document.getElementById("container")!;
      container.scrollTop = container.scrollHeight;
    }
    firstLoad.current += 1;
  }, [dict]);
  
  return (
    <div id="container">
      <ul id="journal">
        {Object.keys(dict).map((year) => (
          <YearEntry year={year} key={year} />
        ))}
      </ul>
    </div>
  );
}


export default Journal;
