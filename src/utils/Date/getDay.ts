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