import { useCallback, type FC, type ReactNode } from 'react';
import { type DayCorners, useDayContext } from '../context/DayContext';
import { useCalendarContext } from '../context/CalendarContext';
import type { Dayjs } from 'dayjs';

export interface DayInnerProps {
  // onClick(): void;
  isToday: boolean;
  // isSelected: boolean;
  belongsToSelectedMonth: boolean;
  // isOutOfRange: boolean;
  // isOverlapPlaceholder: boolean;
  date: Dayjs;
  // alt: string;
  // corners: DayCorners;
}

export interface DayProps {
  children(props: DayInnerProps): ReactNode;
}

export const Day: FC<DayProps> = ({ children }) => {
  const calendarState = useCalendarContext();
  const {
    // selectedDate,
    // setSelectedDate,
    viewedDate: temporarySelectedDate,
    // setTemporarySelectedDate,
    // minimumSelectableDate,
    // maximumSelectableDate,
    dayjs,
    plugins,
    // altDateFormat,
  } = calendarState;
  const dayState = useDayContext();
  const { date } = dayState;

  const additionnalProps = plugins
    .map((plugin) =>
      plugin.dayHook !== undefined
        ? plugin.dayHook(calendarState, dayState)
        : {},
    )
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  // const onClick = useCallback(() => {
  //   if (
  //     date.isAfter(maximumSelectableDate) ||
  //     date.isBefore(minimumSelectableDate)
  //   ) {
  //     throw new Error(
  //       `Tried to set a date (${date.toString()}) out of range (${minimumSelectableDate.format(
  //         'D/MM/YYYY',
  //       )}-${maximumSelectableDate.format(
  //         'D/MM/YYYY',
  //       )}). You should not bind the \`onClick\` callback when it's not supposed to be called`,
  //     );
  //   }
  //
  //   setSelectedDate(date);
  //   setTemporarySelectedDate(date);
  // }, [
  //   setSelectedDate,
  //   date,
  //   setTemporarySelectedDate,
  //   minimumSelectableDate,
  //   maximumSelectableDate,
  // ]);

  const isToday = date.toString() === dayjs().startOf('day').toString();

  // const isSelected = date.toString() === selectedDate?.toString();

  const belongsToSelectedMonth = date.month() === temporarySelectedDate.month();

  // const alt = date.format(altDateFormat);

  // const isOverlapPlaceholder =
  // overlap === 'no-overlap-with-offset' &&
  // date.month() !== temporarySelectedDate.month();

  return (
    <>
      {children({
        // onClick,
        isToday,
        // isSelected,
        belongsToSelectedMonth,
        // isOutOfRange,
        // isOverlapPlaceholder,
        date,
        // alt,
        // corners,
        ...additionnalProps,
      })}
    </>
  );
};
