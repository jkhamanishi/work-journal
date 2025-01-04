export function monthStringToIndex(monthString: string) {
  switch (monthString.toLowerCase()) {
    case "jan":
    case "january":
      return 0;
    case "feb":
    case "february":
      return 1;
    case "mar":
    case "march":
      return 2;
    case "apr":
    case "april":
      return 3;
    case "may":
      return 4;
    case "jun":
    case "june":
      return 5;
    case "jul":
    case "july":
      return 6;
    case "aug":
    case "august":
      return 7;
    case "sep":
    case "september":
      return 8;
    case "oct":
    case "october":
      return 9;
    case "nov":
    case "november":
      return 10;
    case "dec":
    case "december":
      return 11;
    default:
      return -1;
  }
}

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







