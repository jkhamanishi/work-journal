import { HTMLAttributes, KeyboardEvent, useEffect, useRef, useState } from "react";

import { useJournalContext } from "../contexts/useJournalContext";
import { getYearData, getMonthData, getWeekData, getDayData, getProjectData, getProjectDate } from "../hooks/useJournalData";
import type { MonthInfo, WeekInfo, DayInfo, ProjectInfo, TaskInfo } from "../hooks/useJournalData";

import { tabToNext, tabToPrevious } from "../utils/tabToNext";
import insertKeyValuePair from "../utils/insertKeyValuePair";
import renameObjectKey from "../utils/renameObjectKey";
import { getDateLabels, getDayLabel, getNextDay, getNextMonday } from "../utils/dateUtils";


function TreeBranch() {
  return (
    <>
      <div className="v-branch" />
      <div className="h-branch" />
    </>
  );
}

interface EditableEntryProps {
  entry: string;
  saveFcn: (s: string) => void;
  newEntryFcn: (s: string) => void;
  deleteEntry: () => void;
}

function EditableEntry({entry, saveFcn, newEntryFcn, deleteEntry}: EditableEntryProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [size, setSize] = useState(entry.length + 10);
  
  const save = () => {
    if (ref.current) {
      saveFcn(ref.current.value);
      if (!ref.current?.value) {
        deleteEntry();
      }
    }
  }
  
  const inputHandler = (event: KeyboardEvent) => {
    if (ref.current) {
      switch (event.key) {
        case "Enter":
          save();
          newEntryFcn(ref.current.value);
          return;
        case "ArrowUp":
          return tabToPrevious(ref.current);
        case "ArrowDown":
          return tabToNext(ref.current);
        case "Escape":
          return save();
        default:
          return setSize(ref.current.value.length + 11);
      }
    }
  };
  
  const inputProps: HTMLAttributes<HTMLInputElement> = {
    defaultValue: entry,
    onKeyDown: inputHandler,
    onBlur: save,
    autoFocus: (!entry),
  };
  return ( <input ref={ref} type="text" spellCheck="true" size={size} {...inputProps} /> );
}

function TaskEntry({task, index}: {task: TaskInfo, index: number}) {
  const {setData} = useJournalContext();
  
  const save = (newTask: string) => {
    setData((data) => {
      const oldTask = data[task.year][task.month][task.week][task.day][task.project][index];
      if (oldTask != newTask) {
        data[task.year][task.month][task.week][task.day][task.project][index] = newTask;
        return {...data};
      } else {
        return data;
      }
    });
  };
  
  const deleteTask = () => {
    setData((data) => {
      const project = data[task.year][task.month][task.week][task.day][task.project];
      if (!project[index]) {
        project.splice(index, 1);
        data[task.year][task.month][task.week][task.day][task.project] = project;
      }
      return {...data};
    });
  }
  
  const createNewTaskBelow = () => {
    setData((data) => {
      const project = getProjectData(data, task);
      if (index+1 >= project.length || project[index+1] != "") {
        project.splice(index+1, 0, "");
      }
      return {...data};
    });
  };
  
  const createNewProjectBelow = () => {
    setData((data) => {
      const projects = getDayData(data, task);
      const currentProjectIndex = Object.keys(projects).indexOf(task.project);
      const newProjects = insertKeyValuePair("", [], projects, currentProjectIndex+1);
      data[task.year][task.month][task.week][task.day] = newProjects;
      return {...data};
    });
  };
  
  const newEntryFcn = (currentValue: string) => {
    if (currentValue) {
      createNewTaskBelow();
    } else {
      deleteTask();
      createNewProjectBelow();
    }
  }
  
  return (
    <li>
      <EditableEntry entry={task.task} saveFcn={save} newEntryFcn={newEntryFcn} deleteEntry={deleteTask} />
    </li>
  );
}

function ProjectEntry({project}: {project: ProjectInfo}) {
  const {data, setData, defaultProject} = useJournalContext();
  
  const save = (newProjectName: string) => {
    setData((data) => {
      const oldDayData = getDayData(data, project);
      if (project.project != newProjectName) {
        const newDayData = renameObjectKey(oldDayData, project.project, newProjectName);
        data[project.year][project.month][project.week][project.day] = newDayData;
        return {...data};
      } else {
        return data;
      }
    });
  };
  
  const deleteProject = () => {
    setData((data) => {
      const oldDayData = getDayData(data, project);
      if (!project.project && !oldDayData[project.project]?.length) {
        delete oldDayData[project.project];
      }
      return {...data};
    });
  }
  
  const createNewTaskBelow = (currentValue: string) => {
    setData((data) => {
      const projectData = getDayData(data, project)[currentValue];
      if (!projectData.length || projectData[projectData.length-1] != "") {
        data[project.year][project.month][project.week][project.day][currentValue] = [...projectData, ""];
        return {...data};
      } else {
        return {...data};
      }
    });
  };
  
  const createNewDayBelow = () => {
    setData((data) => {
      const currentDay = getProjectDate(project);
      const nextDay = getNextDay(currentDay);
      if (nextDay.getDay() < 6) {             // Same week
        const dayLabel = getDayLabel(nextDay);
        if (dayLabel in getWeekData(data, project)) {
          return {...data};
        } else {
          data[project.year][project.month][project.week][dayLabel] = {[defaultProject]: (defaultProject ? [""] : [])};
          return {...data};
        }
      } else {                                // New week
        const nextMonday = getNextMonday(nextDay);
        const [yearLabel, monthLabel, weekLabel, dayLabel] = getDateLabels(nextMonday);
        if (yearLabel in data) {              // Same year
          const yearData = getYearData(data, yearLabel);
          if (monthLabel in yearData) {       // Same month
            const monthData = yearData[monthLabel];
            if (weekLabel in monthData) {     // Week already exists
              return data;
            } else {                          // New week
              data[yearLabel][monthLabel][weekLabel] = {[dayLabel]: {[defaultProject]: (defaultProject ? [""] : [])}};
              return {...data};
            }
          } else {                            // New month
            data[yearLabel][monthLabel] = {[weekLabel]: {[dayLabel]: {[defaultProject]: (defaultProject ? [""] : [])}}};
            return {...data};
          }
        } else {                              // New year
          data[yearLabel] = {[monthLabel]: {[weekLabel]: {[dayLabel]: {[defaultProject]: (defaultProject ? [""] : [])}}}};
          return {...data};
        }
      }
    });
  };
  
  const newEntryFcn = (currentValue: string) => {
    if (currentValue) {
      createNewTaskBelow(currentValue);
    } else {
      deleteProject();
      createNewDayBelow();
    }
  }
  
  const tasks = getProjectData(data, project).map((task, i) => (
    <TaskEntry task={{task, ...project}} index={i} key={i+"-"+task} />
  ));
  return (
    <li className="project-entry">
      <EditableEntry entry={project.project} saveFcn={save} newEntryFcn={newEntryFcn} deleteEntry={deleteProject} />
      <ul>{tasks}</ul>
    </li>
  );
}

function DayEntry({day}: {day: DayInfo}) {
  const {data} = useJournalContext();
  const projects = Object.keys(getDayData(data, day)).map((project, i) => (
    <ProjectEntry project={{project, ...day}} key={i+"-"+project}/>
  ));
  return (
    <li className="day-entry">
      <TreeBranch />
      <div>
        <span>{day.day}</span>
        <ul>{projects}</ul>
      </div>
    </li>
  );
}

function WeekEntry({week}: {week: WeekInfo}) {
  const {data} = useJournalContext();
  const days = Object.keys(getWeekData(data, week)).map((day, i) => (
    <DayEntry day={{day, ...week}}  key={i+"-"+day}/>
  ));
  return (
    <li className="week-entry">
      <TreeBranch />
      <div>
        <span>{week.week}</span>
        <ul>{days}</ul>
      </div>
    </li>
  );
}

function MonthEntry({month}: {month: MonthInfo}) {
  const {data} = useJournalContext();
  const weeks = Object.keys(getMonthData(data, month)).map((week, i) => (
    <WeekEntry week={{week, ...month}} key={i+"-"+week}/>
  ));
  return (
    <li className="month-entry">
      <TreeBranch />
      <div>
        <span>{month.month}</span>
        <ul>{weeks}</ul>
      </div>
    </li>
  );
}

function YearEntry({year}: {year: string}) {
  const {data} = useJournalContext();
  const months = Object.keys(getYearData(data, year)).map((month, i) => (
    <MonthEntry month={{year, month}} key={i+"-"+month}/>
  ));
  return (
    <li className="year-entry">
      <span>{year}</span>
      <ul>{months}</ul>
    </li>
  );
}

function Journal() {
  const {data} = useJournalContext();
  const firstLoad = useRef(0);
  
  useEffect(() => {
    if (firstLoad.current <= 1) {
      const root = document.getElementById("root")!;
      root.scrollTop = root.scrollHeight;
    }
    firstLoad.current += 1;
  }, [data]);
  
  const years = Object.keys(data).map((year, i) => (
    <YearEntry year={year} key={i+"-"+year} />
  ));
  return (
    <ul id="journal">
      {years}
    </ul>
  );
}


export default Journal;
