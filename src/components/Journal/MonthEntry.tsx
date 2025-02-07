import { MonthInfo, useMonthContext } from "../../hooks/useJournalDataContext";
import TreeBranch from "./TreeBranch";
import WeekEntry from "./WeekEntry";


function MonthEntry({month}: {month: MonthInfo}) {
  const { data } = useMonthContext(month);
  return (
    <li className="month-entry">
      <TreeBranch />
      <div>
        <span>{month.month}</span>
        <ul>
          {data.listOfWeeks.map(week => (
            <WeekEntry week={{week, ...month}} key={week}/>
          ))}
        </ul>
      </div>
    </li>
  );
}


export default MonthEntry;
