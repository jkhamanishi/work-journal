import { useWeekContext, WeekInfo } from "../../hooks/useJournalDataContext";
import DayEntry from "./DayEntry";
import TreeBranch from "./TreeBranch";


function WeekEntry({week}: {week: WeekInfo}) {
  const { data } = useWeekContext(week);
  return (
    <li className="week-entry">
      <TreeBranch />
      <div>
        <span>{week.week}</span>
        <ul>
          {data.listOfDays.map(day => (
            <DayEntry day={{day, ...week}} key={day}/>
          ))}
        </ul>
      </div>
    </li>
  );
}


export default WeekEntry;
