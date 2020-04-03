import { days, months } from "const/date";

export function getCurrentDate() {
  const localTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
  return new Date(localTime);
}

/**
 * 
 * @param {Date} dateA Date object A
 * @param {Date} dateB Date object B
 * @returns {Boolean} are the two compared dates is the same day
 */
export function isSameDay(dateA, dateB) {
  return dateA.toDateString() === dateB.toDateString();
}


/**
 * 
 * @param {Date} date date to be formatted
 * @returns {String} formatted date
 */
export function formatFullDate(date) {
  if (!date) return ''
  const dayName = days[date.getDay()]
  const dateName = date.getDate()
  const monthName = months[date.getMonth()]
  const yearName = date.getFullYear()
  return `${dayName}, ${dateName} ${monthName} ${yearName}`
}
