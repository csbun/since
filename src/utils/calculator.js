import moment from 'moment';

export const A_DAY_MS = 1000 * 60 * 60 * 24;

export function toMidnightTimeStamp(date) {
  return Math.floor(+date / A_DAY_MS) * A_DAY_MS;
}

export function daysBetween(dTo, dFrom) {
  return (toMidnightTimeStamp(dFrom) - toMidnightTimeStamp(dTo)) / A_DAY_MS;
  // return moment.duration(dFrom - dTo).asDays();
}

export function daysFromNow(dTo) {
  return daysBetween(dTo, Date.now());
}

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}
