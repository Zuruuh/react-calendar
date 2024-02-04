import type { Dayjs, ManipulateType } from 'dayjs';
import type { CalendarControls } from '../context/CalendarContext';
import type { CalendarPlugin } from '../plugin';
import type { Setter } from '../types/Setter';
import { useMemo } from 'react';

declare module '@zuruuh/react-calendar' {
  // interface CalendarProps {
  //   viewedDate: Dayjs;
  //   setViewedDate: Setter<Dayjs>;
  // }

  interface CalendarState {
    controls: CalendarControls;
  }
}

/**
 * @internal
 */
export function createControlFactory(
  date: Dayjs,
  setDate: (date: Dayjs) => unknown,
): (
  positive: boolean,
  unit: ManipulateType,
  referenceDate: Dayjs,
) => { disabled: boolean; execute(): void } {
  return (
    positive: boolean,
    unit: ManipulateType,
    referenceDate: Dayjs | null,
  ) => {
    const modifiedDate = (
      positive ? date.add(1, unit) : date.subtract(1, unit)
    ).date(1);

    return {
      disabled:
        referenceDate !== null &&
        (positive
          ? modifiedDate.isAfter(referenceDate.endOf(unit))
          : modifiedDate.isBefore(referenceDate.startOf(unit))),
      execute(): void {
        setDate(modifiedDate);
      },
    };
  };
}

export default function ({}): CalendarPlugin<{}> {
  return {
    id: 'controls',
    calendarHook(state): { controls: CalendarControls } {
      const controlFactory = createControlFactory(
        state.viewedDate,
        state.setViewedDate,
      );

      return {
        controls: {
          nextYear: controlFactory(true, 'year' /*TODO add boundary here*/),
        },
      };
    },
  };
}

// const plugins = useMemo(() => [range(), controls({step: '1 week'})]) // Array<CalendarPlugin>

// <Calendar.Day plugins={plugins}>
// <Calendar.Day<typeof plugins>>
