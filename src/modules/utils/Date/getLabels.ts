import { getNextDay, getThisMonday, getThisFriday } from "./getDay";

export function getDayLabel(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getThisWeekLabel(currentDay: Date) {
  const thisMonday = getThisMonday(currentDay);
  const thisFriday = getThisFriday(currentDay);
  const mondayLabel = thisMonday.toLocaleDateString("en-US", {month: "short", day: "numeric"});
  const fridayLabel = thisFriday.toLocaleDateString("en-US", {month: "short", day: "numeric"});
  return (mondayLabel + " – " + fridayLabel);
}

function getThisMonthString(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long" });
}

function getThisYearString(date: Date) {
  return date.toLocaleDateString("en-US", { year: "numeric" });
}

export function getDateLabels(currentDay: Date) {
  const thisMonday = getThisMonday(currentDay);
  const thisTuesday = getNextDay(thisMonday);
  const thisWednesday = getNextDay(thisTuesday);
  const thisThursday = getNextDay(thisWednesday);
  const thisFriday = getNextDay(thisThursday);
  const weekArray = [thisMonday, thisTuesday, thisWednesday, thisThursday, thisFriday];
  
  let monthLabel;
  const mondayMonth = thisMonday.getMonth();
  if (weekArray.filter((day) => day.getMonth() == mondayMonth).length >= 3) {
    monthLabel = getThisMonthString(thisMonday);
  } else {
    monthLabel = getThisMonthString(thisFriday);
  }
  
  let yearLabel;
  const mondayYear = thisMonday.getFullYear();
  if (weekArray.filter((day) => day.getFullYear() == mondayYear).length >= 3) {
    yearLabel = getThisYearString(thisMonday);
  } else {
    yearLabel = getThisYearString(thisFriday);
  }
  
  const weekLabel = getThisWeekLabel(currentDay);
  const dayLabel = getDayLabel(currentDay);
  return [yearLabel, monthLabel, weekLabel, dayLabel] as const;
}

