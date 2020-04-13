import { days, months } from "const/date";

export function getCurrentDate() {
  const localTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
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

/**
 * 
 * @param {Date} startDate 
 * @param {Date} finishDate 
 * @param {Array} structureKeys array of keys to be calculated
 * @returns {Object} object that contains period based on structure key
 */
export function countTimePeriod(startDate, finishDate, structureKeys) {
  let delta = Math.abs(finishDate - startDate) / 1000;
  const result = {};
  const sTemplate = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  let structure = {};
  if (!structureKeys) {
    structure = {...sTemplate};
  } else {
    structureKeys.forEach(key => {
      structure[key] = sTemplate[key];
    })
  }

  Object.keys(structure).forEach(function (key) {
    result[key] = Math.floor(delta / structure[key]);
    delta -= result[key] * structure[key];
  });

  return result;
}

/**
 * 
 * @param {Date} startDate 
 * @param {Date} finishDate 
 * @returns {String} hours, minutes, second
 */
export function printTimeCompletion(startDate, finishDate) {
  const r = countTimePeriod(startDate, finishDate, ['hour', 'minute', 'second'])
  const addS = (value) => value > 1 ? 's' : '';
  const { hour, minute, second } = r;
  const string = [`${hour} hour${addS(hour)}`, `${minute} minute${addS(minute)}`, `${second} second${addS(second)}`];

  if (!r.hour) {
    string.shift();
    if (!r.minute) string.shift()
  }
  return string.join(' ');
}
