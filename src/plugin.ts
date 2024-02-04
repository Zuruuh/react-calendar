import type { CalendarState } from './context/CalendarContext';
import type { DayContextState } from './context/DayContext';

export interface CalendarPluginDefinition {
  dayInnerProps?: Record<string, unknown>;
  calendarInnerProps?: Record<string, unknown>;
}

export interface CalendarPlugin<T extends CalendarPluginDefinition> {
  id: string;
  requiredPlugins?: Array<string>;
  dayHook?(
    calendarState: CalendarState,
    dayState: DayContextState,
  ): T['dayInnerProps'];
  calendarHook?(calendarState: CalendarState): T['calendarInnerProps'];
}
