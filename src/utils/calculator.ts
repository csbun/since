import dayjs, {ConfigType} from 'dayjs';
import {EventItem} from '../context/EventItems';

export function toMidnightTimeStamp(date: ConfigType) {
  return dayjs(date).startOf('day').valueOf();
}

export function daysBetween(dTo: ConfigType, dFrom: ConfigType = new Date()) {
  return dayjs(dTo).diff(toMidnightTimeStamp(dFrom), 'day');
}

export function daysSinceByItem(item: EventItem) {
  const diff = daysBetween(item.date);
  if (diff === 0) {
    return {
      diff,
      diffText: '今天',
      preText: '',
      postText: '',
    };
  }
  return {
    diff,
    diffText: Math.abs(diff),
    preText: diff > 0 ? '倒计时' : '已过去',
    postText: '天',
    // color:
  };
}

// export function daysFromNow(dTo) {
//   return daysBetween(dTo, Date.now());
// }

export function formatDate(date: ConfigType) {
  return dayjs(date).format('YYYY-MM-DD');
}
