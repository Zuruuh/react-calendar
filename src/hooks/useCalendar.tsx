import { type FC, ReactNode, useState, useMemo } from 'react';
// import type {
//   CalendarPlugin,
//   CalendarPluginDefinition,
//   CalendarPlugins,
// } from '../plugin';
import day, { type Dayjs } from 'dayjs';
import { CalendarContext } from '../context/CalendarContext';

export type Calendar /*<TPlugins extends CalendarPlugins>*/ = {
  weeks: Record<string, Record<string, DayState>>;
}; // & MergedPluginProps<TPlugins, 'rootState'>;

interface DayState {
  date: Dayjs;
}

// type MergedPluginProps<
//   T extends CalendarPlugins,
//   Key extends keyof CalendarPluginDefinition,
// > = T extends [infer First, ...infer Rest]
//   ? First extends CalendarPlugin<infer FirstProps>
//     ? Rest extends CalendarPlugins
//       ? FirstProps[Key] & MergedPluginProps<Rest, Key>
//       : FirstProps[Key]
//     : {}
//   : {};

export type CalendarOptions /*<TPlugins extends CalendarPlugins>*/ = {
  initialViewedDate: Dayjs;
  dayjs: () => Dayjs;
}; // & MergedPluginProps<TPlugins, 'rootConfiguration'>;

export type CalendarProps = {
  children: ReactNode;
};

export function useCalendar(
  // <const TPlugins extends Readonly</*CalendarPlugins*/Array<never>> = readonly [],>
  props: /*{ plugins: TPlugins }*/ CalendarOptions /*<
  TPlugins extends readonly [...infer U] ? U : never>*/,
): Calendar /*<TPlugins extends readonly [...infer U] ? U : never> */ {
  return useMemo(() => {
    const api: Calendar = { weeks: {} };
    const weeks = Array.from(
      generateWeeksBasedOnOverlap(props.initialViewedDate),
    );

    for (let i = 0; i < weeks.length; i++) {
      const week = weeks[i]!;
      api.weeks[week.toString()] ??= {};

      for (let j = 0; j < 7; j++) {
        const date = props.initialViewedDate.add(i, 'weeks').add(j, 'days');
        api.weeks[week.toString()]![date.format('YYYY-MM-D')] = { date };
      }
    }

    return api;
  }, [props]);
}

/**
 * @internal
 */
function overlapLoopCheck(
  i: number,
  startOfMonth: Dayjs,
  referenceMonth: number,
): boolean {
  if (i === 0) {
    return true;
  }

  const date = startOfMonth.add(i, 'weeks');

  return [date.startOf('week').month(), date.endOf('week').month()].includes(
    referenceMonth,
  );
}

/**
 * @internal
 */
export function* generateWeeksBasedOnOverlap(
  referenceDate: Dayjs,
  // overlap: CalendarOverlap,
): Generator<number> {
  const startOfMonth = referenceDate.startOf('month');

  // switch (overlap) {
  // case 'overlap':
  // case 'no-overlap-with-offset':
  for (
    let i = 0;
    overlapLoopCheck(i, startOfMonth, referenceDate.month());
    i++
  ) {
    yield startOfMonth.add(i, 'week').startOf('week').week();
  }

  // break;
  //   case 'no-overlap':
  //     for (let i = 0; i < Math.ceil(startOfMonth.daysInMonth() / 7); i++) {
  //       yield [
  //         startOfMonth.add(i, 'week').week(),
  //         startOfMonth.add(i + 1, 'week').week(),
  //       ];
  //     }
  //
  //     break;
  // }
}
