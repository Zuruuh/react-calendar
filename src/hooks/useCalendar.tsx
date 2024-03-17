import {
  type ReactNode,
  useMemo,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import type { Dayjs, ManipulateType } from 'dayjs';

export type Calendar = {
  weeks: Array<WeekState>;
  controller: CalendarController;
};

export interface WeekState {
  startWeek: number;
  endWeek: number;
  days: Array<DayState>;
}

interface DayState {
  date: Dayjs;
  outsideViewedMonth: boolean;
}

export type CalendarOverlap = 'overlap' | 'no-overlap';

export type CalendarOptions = {
  viewedDate: Dayjs;
  setViewedDate: Dispatch<SetStateAction<Dayjs>>;
  dayjs: () => Dayjs;
  overlap: CalendarOverlap;
};

export type CalendarController = (count: number, unit: ManipulateType) => void;

export type CalendarProps = {
  children: ReactNode;
};

export function useCalendar(props: CalendarOptions): Calendar {
  const controller = useCallback<Calendar['controller']>(
    (count, unit) => {
      props.setViewedDate(props.viewedDate.add(count, unit));
    },
    [props.viewedDate, props.setViewedDate],
  );

  const startOfMonth = props.viewedDate
    .startOf('month')
    .hour(0)
    .minute(0)
    .second(0);
  const endOfMonth = props.viewedDate
    .endOf('month')
    .hour(23)
    .minute(59)
    .second(59);

  const rawWeeks = useMemo(
    () => Array.from(generateWeeksBasedOnOverlap(startOfMonth, props.overlap)),
    [startOfMonth.toString(), props.overlap],
  );
  const weeks: Array<WeekState> = useMemo(
    () =>
      Array.from({ length: rawWeeks.length }).map((_, i) => {
        const week = rawWeeks[i]!;
        const days: Array<DayState> = [];

        for (let j = 0; j < 7; j++) {
          let date: Dayjs;
          switch (props.overlap) {
            case 'overlap':
              date = startOfMonth
                .startOf('week')
                .add(i, 'weeks')
                .add(j, 'days');
              break;
            case 'no-overlap':
              date = startOfMonth.add(i, 'weeks').add(j, 'days');
              break;
          }

          days.push({
            date,
            outsideViewedMonth:
              date.isBefore(startOfMonth) || date.isAfter(endOfMonth),
          });
        }

        return { startWeek: week[0], endWeek: week[1] ?? week[0], days };
      }),
    [rawWeeks],
  );

  return useMemo(
    () => ({
      controller,
      weeks,
    }),
    [controller, weeks],
  );
}

/**
 * @internal
 */
function overlapLoopCheck(
  i: number,
  startOfMonth: Dayjs,
  referenceMonth: number,
): boolean {
  if (i === 0) {
    return true;
  }

  const date = startOfMonth.add(i, 'weeks');

  return [date.startOf('week').month(), date.endOf('week').month()].includes(
    referenceMonth,
  );
}

/**
 * @internal
 */
export function* generateWeeksBasedOnOverlap(
  referenceDate: Dayjs,
  overlap: CalendarOverlap,
): Generator<[number, null | number]> {
  const startOfMonth = referenceDate.startOf('month');

  switch (overlap) {
    case 'overlap':
      for (
        let i = 0;
        overlapLoopCheck(i, startOfMonth, referenceDate.month());
        i++
      ) {
        yield [startOfMonth.add(i, 'week').startOf('week').week(), null];
      }

      break;
    case 'no-overlap':
      for (let i = 0; i < Math.ceil(startOfMonth.daysInMonth() / 7); i++) {
        yield [
          startOfMonth.add(i, 'week').week(),
          startOfMonth.add(i + 1, 'week').week(),
        ];
      }

      break;
  }
}
