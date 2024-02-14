import { useMemo } from 'react';
import highlightRange from '../plugins/highlight-range';
import controls from '../plugins/controls';
import {
  CalendarPlugin,
  CalendarPluginDefinition,
  CalendarPlugins,
} from '../plugin';
import { CalendarControls } from '../context/CalendarContext';
import { CalendarOptions, MergedPluginProps, useCalendar } from './useCalendar';
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

  type Options = MergedPluginProps<typeof plugins, 'rootConfiguration'>;
  type E = [boolean] extends [infer First, ...infer Rest] ? Rest : never;

  return <calendar.Root>{({ dayjs }) => <p>hello world</p>}</calendar.Root>;
};
