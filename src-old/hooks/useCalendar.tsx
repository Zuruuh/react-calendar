import { type FC, ReactNode, useCallback } from 'react';
import type {
  CalendarPlugin,
  CalendarPluginDefinition,
  CalendarPlugins,
} from '../plugin';
import day, { type Dayjs } from 'dayjs';
import type {
  CalendarContext,
  CalendarState,
} from '../context/CalendarContext';

export type Calendar<TPlugins extends CalendarPlugins> = {
  calendar: {
    Root: FC<CalendarProps>;
  };
} & MergedPluginProps<TPlugins, 'rootState'>;

type MergedPluginProps<
  T extends CalendarPlugins,
  Key extends keyof CalendarPluginDefinition,
> = T extends [infer First, ...infer Rest]
  ? First extends CalendarPlugin<infer FirstProps>
    ? Rest extends CalendarPlugins
      ? FirstProps[Key] & MergedPluginProps<Rest, Key>
      : FirstProps[Key]
    : {}
  : {};

export type CalendarOptions<TPlugins extends CalendarPlugins> = {
  viewedDate?: Dayjs;
  dayjs?: () => Dayjs;
} & MergedPluginProps<TPlugins, 'rootConfiguration'>;

export type CalendarProps = {
  children: ReactNode;
};

export function useCalendar<
  const TPlugins extends Readonly<CalendarPlugins> = readonly [],
>({
  plugins,
  dayjs = () => day(),
  viewedDate,
  ...props
}: { plugins: TPlugins } & CalendarOptions<
  TPlugins extends readonly [...infer U] ? U : never
>): Calendar<TPlugins extends readonly [...infer U] ? U : never> {
  // function RootComponent({ children }: CalendarProps) {
  //   const dayFactory = useCallback(
  //     () => dayjs().utc(true).second(0).minute(0).hour(12),
  //     [dayjs],
  //   );
  //
  //   const baseState: CalendarState & Record<string, unknown> = {
  //     dayjs,
  //     viewedDate: viewedDate ?? dayFactory(),
  //     ...props,
  //   };
  //
  //   const state = {
  //     ...baseState,
  //     ...plugins
  //       .map((plugin) =>
  //         plugin.calendarHook !== undefined
  //           ?
  //             plugin.calendarHook(baseState) : {},
  //       )
  //       .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
  //   };
  //
  //   return (
  //     <>{children}</>
  //   );
  // }

  return {
    calendar: {
      Root: Calendar,
    },
  };
}

const Calendar: FC<CalendarProps> = ({ children }) => {
  return (
    <CalendarContext.Provider value={{}}>{children}</CalendarContext.Provider>
  );
};
