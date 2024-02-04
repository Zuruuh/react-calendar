import { createContext, useContext } from 'react';
import type { Setter } from '../types/Setter';
import type { Dayjs } from 'dayjs';
import { CalendarPlugin } from '../plugin';

export type CalendarOverlap =
  | 'overlap'
  | 'no-overlap'
  | 'no-overlap-with-offset';

export interface CalendarControl {
  execute(): void;
  disabled: boolean;
}

export interface CalendarControls {
  nextMonth: CalendarControl;
  nextYear: CalendarControl;
  prevMonth: CalendarControl;
  prevYear: CalendarControl;
}

export interface CalendarState {
  // selectedDate: Dayjs | null;
  // setSelectedDate: Setter<Dayjs | null>;
  // temporarySelectedDate: Dayjs;
  // setTemporarySelectedDate: Setter<Dayjs>;
  // minimumSelectableDate: Dayjs;
  // maximumSelectableDate: Dayjs;
  // controls: CalendarControls;
  // overlap: CalendarOverlap;
  plugins: Array<CalendarPlugin>;
  viewedDate: Dayjs;
  setViewedDate: Setter<Dayjs>;
  dayjs(): Dayjs;
  // altDateFormat: string;
}

/**
 * @internal
 */
export const CalendarContext = createContext<CalendarState | undefined>(
  undefined,
);

/**
 * @internal
 */
export function useCalendarContext(): CalendarState & {
  overlap: CalendarOverlap;
} {
  const state = useContext(CalendarContext);
  if (state === undefined) {
    throw new Error(
      'Uninitialized date picker context used! ' +
        'You probably tried to render a Date Picker (like <Calendar.Weeks>) ' +
        'element without wrapping it in a <Calendar.Root>',
    );
  }

  return { ...state, overlap: 'overlap' };
}
