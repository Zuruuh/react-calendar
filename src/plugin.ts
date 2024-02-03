import type { CalendarState } from './context/CalendarContext';
import type { DayContextState } from './context/DayContext';

export interface CalendarPlugin {
  id: string;
  requiredPlugins?: Array<string>;
  dayHook?(
    calendarState: CalendarState,
    dayState: DayContextState,
  ): Record<string, unknown>;
}
