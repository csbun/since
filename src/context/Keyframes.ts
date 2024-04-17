import dayjs, {Dayjs} from 'dayjs';
import {useListStorage} from './Storage';

class Keyframe {
  id: string;
  date: Dayjs;

  constructor(date: Dayjs) {
    this.id = '' + date.valueOf();
    this.date = date;
  }
}

// export const KEYFRAMES_STORAGE_KEY = 'keyframes';

export function useKeyframes(eventItemId: string, eventItemDate: string) {
  // const {listItems, ...others} = useListStorage<Keyframe>(
  //   `${KEYFRAMES_STORAGE_KEY}:${eventItemId}`,
  // );

  const keyframes = generateFeatureKeyframesByDate(dayjs(eventItemDate)).map(
    date => new Keyframe(date),
  );

  return {
    keyframes,
    //   ...others,
  };
}

/**
 * 根据日前生成最近一年的关键日期，如 N*100天，N周年等
 */
function generateFeatureKeyframesByDate(date: Dayjs) {
  const keyDateList: Dayjs[] = [];
  const now = dayjs();
  if (now > date) {
    // 过去的时间，生成最近的百日、周年列表
    const diffYear = now.diff(date, 'year');
    keyDateList.push(date.add(diffYear + 1, 'year'));
    const diffDay = now.diff(date, 'day');
    if (diffDay < 1000) {
      const next100 = ((diffDay % 100) + 1) * 100;
      keyDateList.push(date.add(next100, 'day'));
      if (next100 < 1000) {
        keyDateList.push(date.add(1000, 'day'));
      }
    } else {
      keyDateList.push(date.add((diffDay % 1000) + 1, 'day'));
    }
  } else {
    // TODO: 未来时间，生成最近的100天、1000天的列表
  }
  return keyDateList.sort((a, b) => a.diff(b));
}
