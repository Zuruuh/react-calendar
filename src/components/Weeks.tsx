import { useCallback, type ReactNode, type FC } from 'react';
import {
  type CalendarOverlap,
  useCalendarContext,
} from '../context/CalendarContext';
import { WeekContext } from '../context/WeekContext';
import type { Dayjs } from 'dayjs';
import type { WeekNumber, WeekNumbers } from '../types/WeekNumber';

export interface WeeksInnerProps {
  weekNumbers: WeekNumber;
  weekIndex: number;
  totalWeeks: number;
}

export interface WeeksProps {
  children: ReactNode | ((props: WeeksInnerProps) => ReactNode);
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
): Generator<WeekNumber> {
  const startOfMonth = referenceDate.startOf('month');

  switch (overlap) {
    case 'overlap':
    case 'no-overlap-with-offset':
      for (
        let i = 0;
        overlapLoopCheck(i, startOfMonth, referenceDate.month());
        i++
      ) {
        yield [startOfMonth.add(i, 'week').startOf('week').week()];
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

export const Weeks: FC<WeeksProps> = ({ children }) => {
  const { date: temporarySelectedDate, overlap } = useCalendarContext();

  const createChildren = useCallback(
    (props: WeeksInnerProps) =>
      typeof children === 'function' ? children(props) : children,
    [children],
  );

  const weeks = Array.from(
    generateWeeksBasedOnOverlap(temporarySelectedDate, overlap),
  ) as WeekNumbers;

  return (
    <>
      {weeks.map((weekNumbers, weekIndex, { length: totalWeeks }) => (
        <WeekContext.Provider
          key={weekNumbers.join('-')}
          value={{ weekNumbers, weekIndex, totalWeeks }}
        >
          {createChildren({ weekNumbers, weekIndex, totalWeeks })}
        </WeekContext.Provider>
      ))}
    </>
  );
};
