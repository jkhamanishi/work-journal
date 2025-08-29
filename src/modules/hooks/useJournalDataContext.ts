import { useJournalContext } from "./useJournalContext";
import { JournalDict } from "./useJournalDict";

export interface MonthInfo { year: string; month: string }
export interface WeekInfo extends MonthInfo { week: string }
export interface DayInfo extends WeekInfo { day: string }
export interface ProjectInfo extends DayInfo { project: string }
export interface TaskInfo extends ProjectInfo { task: string }


class JournalData {
  dict: JournalDict
  constructor(dict: JournalDict) {
    this.dict = dict
  }
  get listOfYears() {
    return Object.keys(this.dict);
  }
}

class YearData extends JournalData {
  info: {year: string}
  constructor(dict: JournalDict, year: string){
    super(dict);
    this.info = {year};
  }
  get year() {
    return this.dict[this.info.year];
  }
  set year(updatedYear) {
    this.dict[this.info.year] = updatedYear;
  }
  get listOfMonths() {
    return Object.keys(this.year);
  }
}

class MonthData extends YearData {
  info: MonthInfo
  constructor(dict: JournalDict, month: MonthInfo){
    super(dict, month.year);
    this.info = month;
  }
  get month() {
    return this.dict[this.info.year][this.info.month];
  }
  set month(updatedMonth) {
    this.dict[this.info.year][this.info.month] = updatedMonth;
  }
  get listOfWeeks() {
    return Object.keys(this.month);
  }
}

class WeekData extends MonthData {
  info: WeekInfo
  constructor(dict: JournalDict, week: WeekInfo){
    super(dict, week);
    this.info = week;
  }
  get week() {
    return this.dict[this.info.year][this.info.month][this.info.week];
  }
  set week(updatedWeek) {
    this.dict[this.info.year][this.info.month][this.info.week] = updatedWeek;
  }
  get listOfDays() {
    return Object.keys(this.week);
  }
}

class DayData extends WeekData {
  info: DayInfo
  constructor(dict: JournalDict, day: DayInfo){
    super(dict, day);
    this.info = day;
  }
  get day() {
    return this.dict[this.info.year][this.info.month][this.info.week][this.info.day];
  }
  set day(updatedDay) {
    this.dict[this.info.year][this.info.month][this.info.week][this.info.day] = updatedDay;
  }
  get listOfProjects() {
    return Object.keys(this.day);
  }
}

class ProjectData extends DayData {
  info: ProjectInfo
  constructor(dict: JournalDict, project: ProjectInfo){
    super(dict, project);
    this.info = project;
  }
  get project() {
    return this.dict[this.info.year][this.info.month][this.info.week][this.info.day][this.info.project];
  }
  set project(updatedProject) {
    this.dict[this.info.year][this.info.month][this.info.week][this.info.day][this.info.project] = updatedProject;
  }
}



export function useYearContext(year: string) {
  const { dict, save } = useJournalContext();
  const data = new YearData(dict, year);
  return { data, save };
}

export function useMonthContext(month: MonthInfo) {
  const { dict, save } = useJournalContext();
  const data = new MonthData(dict, month);
  return { data, save };
}

export function useWeekContext(week: WeekInfo) {
  const { dict, save } = useJournalContext();
  const data = new WeekData(dict, week);
  return { data, save };
}

export function useDayContext(day: DayInfo) {
  const { dict, save } = useJournalContext();
  const data = new DayData(dict, day);
  return { data, save };
}

export function useProjectContext(project: ProjectInfo) {
  const { dict, save } = useJournalContext();
  const data = new ProjectData(dict, project);
  return { data, save };
}


