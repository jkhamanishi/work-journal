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
          {data.listOfProjects.map(project => (
            <ProjectEntry project={{project, ...day}} key={project || data.listOfProjects.length}/>
          ))}
        </ul>
        <div className="spacer" />
      </div>
    </li>
  );
}


export default DayEntry;
