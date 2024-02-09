import type { CalendarPlugins } from '../plugin';

export interface Calendar<TPlugins extends CalendarPlugins> {
  plugins: TPlugins;
}

export function useCalendar<const TPlugins extends CalendarPlugins>({
  plugins,
}: { plugins: TPlugins }): Calendar<TPlugins> {
  return { plugins };
}
