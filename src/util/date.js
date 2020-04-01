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
