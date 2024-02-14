import { useMemo, type FC, ReactNode, useCallback } from 'react';
import type {
  CalendarPlugin,
  CalendarPluginDefinition,
  CalendarPlugins,
} from '../plugin';
import day, { type Dayjs } from 'dayjs';
import type {
  CalendarControls,
  CalendarState,
} from '../context/CalendarContext';

export interface Calendar<TPlugins extends CalendarPlugins> {
  plugins: TPlugins;
  calendar: {
    Root: FC<CalendarProps<TPlugins>>;
  };
}

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

export type CalendarProps<TPlugins extends CalendarPlugins> = {
  children:
    | ReactNode
    | ((
        props: CalendarState &
          MergedPluginProps<TPlugins, 'calendarInnerProps'>,
      ) => ReactNode);
};

export function useCalendar<const TPlugins extends Readonly<CalendarPlugins> = readonly []>({
  plugins,
  dayjs = () => day(),
  viewedDate,
  ...props
}: { plugins: TPlugins } & CalendarOptions<TPlugins extends readonly [...infer U] ? U : never>): Calendar<TPlugins extends readonly [...infer U] ? U : never> {
  type TMutablePlugins = TPlugins extends readonly [...infer U] ? U : never;

  function RootComponent({ children }: CalendarProps<TMutablePlugins>) {
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
          // s-expect-error
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
