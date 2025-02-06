export function getDayOfWeek(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function getNextDay(currentDay: Date) {
  const nextDay = new Date(currentDay);
  nextDay.setDate(currentDay.getDate() + 1);
  return nextDay;
}

export function getThisMonday (currentDay: Date) {
  const newDay = new Date(currentDay);
  newDay.setDate(currentDay.getDate() + 1 - currentDay.getDay());
  return newDay;
}

export function getNextMonday(currentDay: Date) {
  const newDay = new Date(currentDay);
  newDay.setDate(currentDay.getDate() + 7); // Same day next week
  newDay.setDate(newDay.getDate() + 1 - newDay.getDay()); // Set to Monday of that next week
  return newDay;
}

export function getThisFriday (currentDay: Date) {
  const newDay = new Date(currentDay);
  newDay.setDate(currentDay.getDate() + 5 - currentDay.getDay());
  return newDay;
}

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



