import { useMemo } from 'react';
import highlightRange from '../plugins/highlight-range';
import controls from '../plugins/controls';
import { CalendarPlugin } from '../plugin';
import { CalendarControls } from '../context/CalendarContext';

type Expect<Assertion extends true> = Assertion;
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false;

// The plugin definition to be preserved
() => {
  const plugins = useMemo(() => [highlightRange(), controls()] as const, []);

  type _ = Expect<
    Equals<
      readonly [
        CalendarPlugin<{
          dayInnerProps: {
            isOutOfRange: boolean;
          };
        }>,
        CalendarPlugin<{
          calendarInnerProps: {
            controls: CalendarControls;
          };
        }>,
      ],
      typeof plugins
    >
  >;
};
