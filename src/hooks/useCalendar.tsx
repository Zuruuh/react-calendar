import { useMemo, type FC, ReactNode, useCallback } from 'react';
import type { CalendarPlugin, CalendarPlugins } from '../plugin';
import day, { type Dayjs } from 'dayjs';
import type { CalendarState } from '../context/CalendarContext';
import type { UnionToIntersection } from '../types/UnionToIntersection';

export interface Calendar<TPlugins extends CalendarPlugins> {
  plugins: TPlugins;
  calendar: {
    Root: FC<CalendarProps<TPlugins>>;
  };
}

export type CalendarOptions< TPlugins extends CalendarPlugins> = {
  plugins: TPlugins;
  viewedDate?: Dayjs;
  dayjs?: () => Dayjs;
} & (TPlugins[number] extends CalendarPlugin<infer U>
  ? U
  : {});
  // ? UnionToIntersection<U['rootConfiguration']> extends Record<string, unknown>
  // ? UnionToIntersection<U['rootConfiguration']> extends undefined
    // ? never
    // : UnionToIntersection<U['rootConfiguration']>
    // : never);
  // : {});

export type CalendarProps<TPlugins extends CalendarPlugins> = {
  children:
    | ReactNode
    | ((
        props: CalendarState &
          (TPlugins[number] extends CalendarPlugin<infer U>
            ? UnionToIntersection<U['calendarInnerProps']>
            : never),
      ) => ReactNode);
};

export function useCalendar<
  const TPlugins extends CalendarPlugins = readonly [],
>({
  plugins,
  dayjs = () => day(),
  viewedDate,
  ...props
}: CalendarOptions<TPlugins>): Calendar<TPlugins> {
  function RootComponent({ children }: CalendarProps<TPlugins>) {
    const dayFactory = useCallback(
      () => dayjs().utc(true).second(0).minute(0).hour(12),
      [dayjs],
    );

    const baseState: CalendarState = {
      dayjs,
      viewedDate: viewedDate ?? dayFactory(),
      ...props,
    };

    const state = {
      ...baseState,
      ...plugins
        .map((plugin) =>
          plugin.calendarHook !== undefined
            ? plugin.calendarHook(baseState)
            : {},
        )
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    };

    return (
      <>{typeof children === 'function' ? children(state as any) : children}</>
    );
  }

  // const Root = useMemo(() => RootComponent, [dayjs]);

  return {
    plugins,
    calendar: {
      Root: RootComponent,
    },
  };
}

// const plugins = [{} as CalendarPlugin<{dayInnerProps: {isOutOfRange: boolean}}>, {} as CalendarPlugin<{dayInnerProps: {isSomething: boolean}}>] as const;
// const {calendar} = useCalendar({plugins});
// ty
// const e = <calendar.Root>{(props) => <p>Hello</p>}</calendar.Root>
// type E = CalendarState & (typeof plugins)[number] extends CalendarPlugin<infer U> ? U['dayInnerProps'] : never;
// type UnionToIntersection<U> =
// (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;

// type What = (typeof plugins)[number] extends CalendarPlugin<infer U> ? UnionToIntersection<U['dayInnerProps']> : false;
