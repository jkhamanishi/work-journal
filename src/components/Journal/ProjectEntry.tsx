import { useJournalContext } from "../../hooks/useJournalContext";
import { ProjectInfo, useProjectContext } from "../../hooks/useJournalDataContext";
import { getDateLabels, getDayLabel, getNextDay, getNextMonday } from "../../utils/Date";
import { renameObjectKey } from "../../utils/object-manipulation";
import { moveUpKeyValuePair } from "../../utils/object-manipulation/moveKeyValuePair";
import EditableEntry from "./EditableEntry";
import TaskEntry from "./TaskEntry";



const getProjectYear = (project: ProjectInfo) => {
  const monthString = project.day.split(" ")[1];
  if (project.month == "December" && monthString == "January") {
    return Number(project.year) + 1;
  } else if (project.month == "January" && monthString == "December") {
    return Number(project.year) - 1;
  } else {
    return Number(project.year);
  }
}

const getProjectDate = (project: ProjectInfo) => {
  const year = getProjectYear(project);
  const day = project.day;
  return new Date(day+", "+year);
}


function ProjectEntry({project}: {project: ProjectInfo}) {
  const { dict, defaultProject } = useJournalContext();
  const { data, save } = useProjectContext(project);
  
  const saveFcn = (newProjectName: string) => {
    data.day = renameObjectKey(data.day, project.project, newProjectName);
    save();
  }
  const deleteEntry = () => {
    if (!project.project && !data.project.length) {
      delete data.day[project.project];
      save();
    }
  }
  const createNewTaskBelow = (newProjectName: string) => {
    if (!data.project.length || data.project[data.project.length-1] != "") {
      data.project = [...data.project, ""];
      saveFcn(newProjectName);
    }
  }
  const createNewDayBelow = () => {
    const currentDay = getProjectDate(project);
    const nextDay = getNextDay(currentDay);
    if (nextDay.getDay() < 6) {             // Same week
      const dayLabel = getDayLabel(nextDay);
      if (!(dayLabel in data.week)) {
        data.week[dayLabel] = {[defaultProject]: (defaultProject ? [""] : [])};
      }
    } else {                                // Next week
      const nextMonday = getNextMonday(nextDay);
      const [yearLabel, monthLabel, weekLabel, dayLabel] = getDateLabels(nextMonday);
      if (yearLabel in dict) {              // Year already recorded
        const yearData = dict[yearLabel];
        if (monthLabel in yearData) {       // Month already recorded
          const monthData = yearData[monthLabel];
          if (!(weekLabel in monthData)) {  // New week
            data.year[monthLabel][weekLabel] = {[dayLabel]: {[defaultProject]: (defaultProject ? [""] : [])}};
          }
        } else {                            // New month
          data.year[monthLabel] = {[weekLabel]: {[dayLabel]: {[defaultProject]: (defaultProject ? [""] : [])}}};
        }
      } else {                              // New year
        data.dict[yearLabel] = {[monthLabel]: {[weekLabel]: {[dayLabel]: {[defaultProject]: (defaultProject ? [""] : [])}}}};
      }
    }
    save();
  }
  const newEntryFcn = (newProjectName: string) => {
    if (newProjectName) {
      createNewTaskBelow(newProjectName);
    } else {
      deleteEntry();
      createNewDayBelow();
    }
  }
  const moveEntryFcn = (increment: number) => {
    data.day = moveUpKeyValuePair(data.day, project.project, increment);
    save();
  }
  
  return (
    <li className="project-entry">
      <EditableEntry {...{entry: project.project, saveFcn, newEntryFcn, deleteEntry, moveEntryFcn}} />
      <ul>
        {data.project.map((task, i) => (
          <TaskEntry task={{task, ...project}} index={i} key={task || data.project.length} />
        ))}
      </ul>
    </li>
  );
}


export default ProjectEntry;
