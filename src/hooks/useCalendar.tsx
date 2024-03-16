import { type ReactNode, useMemo } from 'react';
import type { Dayjs } from 'dayjs';

export type Calendar = {
  weeks: Array<WeekState>;
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
  initialViewedDate: Dayjs;
  dayjs: () => Dayjs;
  overlap: CalendarOverlap;
};

export type CalendarProps = {
  children: ReactNode;
};

export function useCalendar(props: CalendarOptions): Calendar {
  return useMemo(() => {
    const startOfMonth = props.initialViewedDate
      .startOf('month')
      .hour(0)
      .minute(0)
      .second(0);
    const endOfMonth = props.initialViewedDate
      .endOf('month')
      .hour(23)
      .minute(59)
      .second(59);

    const api: Calendar = { weeks: [] };
    const weeks = Array.from(
      generateWeeksBasedOnOverlap(startOfMonth, props.overlap),
    );

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i]!;
      const days: Array<DayState> = [];

      for (let j = 0; j < 7; j++) {
        let date: Dayjs;
        switch (props.overlap) {
          case 'overlap':
            date = startOfMonth.startOf('week').add(i, 'weeks').add(j, 'days');
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

      api.weeks.push({ startWeek: week[0], endWeek: week[1] ?? week[0], days });
    }

    return api;
  }, [props]);
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
