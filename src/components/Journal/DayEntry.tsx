import { DayInfo, useDayContext } from "../../hooks/useJournalDataContext";
import ProjectEntry from "./ProjectEntry";
import TreeBranch from "./TreeBranch";


function DayEntry({day}: {day: DayInfo}) {
  const { data } = useDayContext(day);
  return (
    <li className="day-entry">
      <TreeBranch />
      <div>
        <span>{day.day}</span>
        <ul>
          {data.listOfProjects.map((project, i) => (
            <ProjectEntry project={{project, ...day}} key={project || i+1}/>
          ))}
        </ul>
      </div>
    </li>
  );
}


export default DayEntry;
