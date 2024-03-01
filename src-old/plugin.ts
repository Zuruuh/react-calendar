export type CalendarPlugins = Array<CalendarPlugin<CalendarPluginDefinition>>;

export interface CalendarPluginDefinition {
  rootConfiguration?: Record<string, unknown>;
  dayInnerProps?: Record<string, unknown>;
  rootState?: Record<string, unknown>;
}

export interface CalendarPlugin<T extends CalendarPluginDefinition> {
  // readonly id: unique symbol;
  id: string;
  requiredPlugins?: Array<string>;
  dayHook?(
    calendarState: CalendarState,
    dayState: DayContextState,
  ): T['dayInnerProps'];
  calendarHook?(
    calendarState: CalendarState & T['rootConfiguration'],
  ): T['rootState'];
}

export function definePlugins<const T extends Array<CalendarPlugin<{}>>>(
  plugins: T,
): Readonly<T> {
  return Object.freeze(plugins);
}
