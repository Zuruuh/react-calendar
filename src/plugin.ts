import type { CalendarState } from './context/CalendarContext';
import type { DayContextState } from './context/DayContext';

export type CalendarPlugins = ReadonlyArray<
  CalendarPlugin<Record<PropertyKey, unknown>>
>;

export interface CalendarPluginDefinition {
  dayInnerProps?: Record<string, unknown>;
  calendarInnerProps?: Record<string, unknown>;
}

export interface CalendarPlugin<T extends CalendarPluginDefinition> {
  // readonly id: unique symbol;
  id: string;
  requiredPlugins?: Array<string>;
  dayHook?(
    calendarState: CalendarState,
    dayState: DayContextState,
  ): T['dayInnerProps'];
  calendarHook?(calendarState: CalendarState): T['calendarInnerProps'];
}
