import dayjs, {Dayjs} from 'dayjs';
// import {useListStorage} from './Storage';

type DiffType =
  | 'COUNTDOWN_DAYS'
  | 'COUNTDOWN_YEARS'
  | 'ANNIVERSARY'
  | 'HUNDREDS_DAYS';

export class Keyframe {
  id: string;
  date: Dayjs;
  diffType: DiffType;
  diff: number;

  constructor(date: Dayjs, diffType: DiffType, diff: number) {
    this.id = '' + date.valueOf();
    this.date = date;
    this.diffType = diffType;
    this.diff = diff;
  }
}

// export const KEYFRAMES_STORAGE_KEY = 'keyframes';

export function useKeyframes(targetDate: string) {
  // const {listItems, ...others} = useListStorage<Keyframe>(
  //   `${KEYFRAMES_STORAGE_KEY}:${eventItemId}`,
  // );

  const keyframes = generateFeatureKeyframesByDate(dayjs(targetDate));

  return {
    keyframes,
    //   ...others,
  };
}

/**
 * 根据日前生成最近一年的关键日期，如 N*100天，N周年等
 */
function generateFeatureKeyframesByDate(date: Dayjs) {
  const keyDateList: Keyframe[] = [];
  const now = dayjs();
  if (now > date) {
    // 过去的时间，生成最近的百日、周年列表
    const diffYear = now.diff(date, 'year') + 1;
    keyDateList.push(
      new Keyframe(date.add(diffYear, 'year'), 'ANNIVERSARY', diffYear),
    );
    const diffDay = now.diff(date, 'day');
    if (diffDay < 1000) {
      const next100 = (Math.floor(diffDay / 100) + 1) * 100;
      keyDateList.push(
        new Keyframe(date.add(next100, 'day'), 'HUNDREDS_DAYS', next100),
      );
      if (next100 < 1000) {
        keyDateList.push(
          new Keyframe(date.add(1000, 'day'), 'HUNDREDS_DAYS', 1000),
        );
      }
    } else {
      const next1000 = (diffDay % 1000) + 1;
      keyDateList.push(
        new Keyframe(date.add(next1000, 'day'), 'ANNIVERSARY', next1000),
      );
    }
  } else {
    // 未来时间，生成最近的100天、整年的列表
    const maxDiffYear = date.diff(now, 'year');
    for (let i = 1; i <= maxDiffYear; i++) {
      keyDateList.push(
        new Keyframe(date.subtract(i, 'year'), 'COUNTDOWN_YEARS', i),
      );
    }
    const maxDiffDays = date.diff(now, 'day');
    if (maxDiffDays <= 10) {
      for (let i = 1; i <= maxDiffDays; i++) {
        keyDateList.push(
          new Keyframe(date.subtract(i, 'day'), 'COUNTDOWN_DAYS', i),
        );
      }
    } else if (maxDiffDays <= 100) {
      const maxDiff10Days = Math.floor(maxDiffDays / 10);
      for (let i = 1; i <= maxDiff10Days; i++) {
        keyDateList.push(
          new Keyframe(date.subtract(i * 10, 'day'), 'COUNTDOWN_DAYS', i * 10),
        );
      }
    } else {
      const maxDiff100Days = Math.floor(maxDiffDays / 100);
      for (let i = 1; i <= maxDiff100Days; i++) {
        keyDateList.push(
          new Keyframe(
            date.subtract(i * 100, 'day'),
            'COUNTDOWN_DAYS',
            i * 100,
          ),
        );
      }
    }
  }
  return keyDateList.sort((a, b) => a.date.diff(b.date));
}
