import { test, expect } from 'bun:test';
import { useMemo } from 'react';
import highlightRange from '../plugins/highlight-range';
import controls from '../plugins/controls';
import { CalendarPlugin, definePlugins } from '../plugin';
import { CalendarControls } from '../context/CalendarContext';
import { useCalendar } from './useCalendar';
import type { Dayjs } from 'dayjs';
import type { Setter } from '../types/Setter';
import dayjs from 'dayjs';

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

// Expect the plugin definition to be preserved
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
};

test('', () => {
  const plugins = useMemo(
    () => definePlugins([highlightRange(), controls()]),
    [],
  );
  const { calendar } = useCalendar({
    plugins,
    setViewedDate: () => {},
    viewedDate: dayjs(),
  });

  return <calendar.Root>{() => <p>hello world</p>}</calendar.Root>;
});
