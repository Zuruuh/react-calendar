import { useMemo } from 'react';
import highlightRange from '../plugins/highlight-range';
import controls from '../plugins/controls';
import { CalendarPlugin, CalendarPluginDefinition, CalendarPlugins } from '../plugin';
import { CalendarControls } from '../context/CalendarContext';
import { CalendarOptions, useCalendar } from './useCalendar';
import type { Dayjs } from 'dayjs';
import type { Setter } from '../types/Setter';

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

// The plugin definition to be preserved
() => {
  const plugins = useMemo(() => [highlightRange(), controls()] as const, []);

  (): Equals<
    readonly [
      CalendarPlugin<{
        dayInnerProps: {
          isOutOfRange: boolean;
        };
      }>,
      CalendarPlugin<{
        rootConfiguration: {
          viewedDate: Dayjs;
          setViewedDate: Setter<Dayjs>;
        };
        calendarInnerProps: {
          controls: CalendarControls;
        };
      }>,
    ],
    typeof plugins
  > => true;

  const { calendar } = useCalendar({ plugins, setViewedDate: () => {} });

  // type Prettify<T extends Record<PropertyKey, unknown>> = {
  //   [K in keyof T]: T[K];
  // };

  type Options = MergedPluginProps<typeof plugins, 'dayInnerProps'>;

  return <calendar.Root>{({ dayjs }) => <p>hello world</p>}</calendar.Root>;
};

type MergedPluginProps<T extends CalendarPlugins, Key extends keyof CalendarPluginDefinition> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends CalendarPlugin<infer FirstProps>
    ? Rest extends CalendarPlugins
      ? FirstProps[Key] & MergedPluginProps<Rest, Key>
      : FirstProps[Key]
    : {}
  : {};
