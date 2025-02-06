import { useState } from "react";
import { getDateLabels } from "../utils/dateUtils";

type Task = string

export interface JournalData {
  [year: string]: {
    [month: string]: {
      [week: string]: {
        [day: string]: {
          [project: string]: Task[]
        }
      }
    }
  }
}

const getExampleData = (): JournalData => {
  const [yearLabel, monthLabel, weekLabel, dayLabel] = getDateLabels(new Date());
  return {
    [yearLabel]: { [monthLabel]: { [weekLabel]: { [dayLabel]: {
      "Example Project": [
        "Example task 1",
        "Example task 2"
      ]
    }}}}
  };
};

export function useJournalData() {
  const [data, setData] = useState<JournalData>(getExampleData);
  return [data, setData] as const;
}

export interface MonthInfo { year: string; month: string }
export interface WeekInfo extends MonthInfo { week: string }
export interface DayInfo extends WeekInfo { day: string }
export interface ProjectInfo extends DayInfo { project: string }
export interface TaskInfo extends ProjectInfo { task: string }

export const getYearData = (data: JournalData, year: string) => data[year];
export const getMonthData = (data: JournalData, month: MonthInfo) => data[month.year][month.month];
export const getWeekData = (data: JournalData, week: WeekInfo) => data[week.year][week.month][week.week];
export const getDayData = (data: JournalData, day: DayInfo) => data[day.year][day.month][day.week][day.day];
export const getProjectData = (data: JournalData, project: ProjectInfo) => data[project.year][project.month][project.week][project.day][project.project];

export const getProjectYear = (project: ProjectInfo) => {
  const monthString = project.day.split(" ")[1];
  if (project.month == "December" && monthString == "January") {
    return Number(project.year) + 1;
  } else if (project.month == "January" && monthString == "December") {
    return Number(project.year) - 1;
  } else {
    return Number(project.year);
  }
};
export const getProjectDate = (project: ProjectInfo) => {
  const year = getProjectYear(project);
  const day = project.day;
  return new Date(day+", "+year);
};

