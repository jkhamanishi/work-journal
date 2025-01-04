import { useState } from "react";
import { getDayOfWeek, monthStringToIndex } from "../utils/dateUtils";
import stringToNumber from "../utils/stringToNumber";

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

export function useJournalData() {
  const [data, setData] = useState<JournalData>({});
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

export const getProjectDate = (project: ProjectInfo) => {
  const year = stringToNumber(project.year);
  const month = monthStringToIndex(project.day.split(" ")[1]);
  const dayOfWeek = project.day.split(", ")[0];
  const day = stringToNumber(project.day);
  let date = new Date(year, month, day);
  if (dayOfWeek != getDayOfWeek(date)) {
    date = new Date(year+1, month, day);
  }
  return date;
};

