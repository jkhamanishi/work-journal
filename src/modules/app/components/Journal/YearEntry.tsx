import { useYearContext } from "../../hooks/useJournalDataContext";
import MonthEntry from "./MonthEntry";


function YearEntry({year}: {year: string}) {
  const { data } = useYearContext(year);
  return (
    <li className="year-entry">
      <span>{year}</span>
      <ul>
        {data.listOfMonths.map(month => (
          <MonthEntry month={{year, month}} key={month}/>
        ))}
      </ul>
    </li>
  );
}


export default YearEntry;
