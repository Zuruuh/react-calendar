import type { Dayjs, ManipulateType } from 'dayjs';
import type { CalendarControls } from '../context/CalendarContext';
import type { CalendarPlugin } from '../plugin';
import { Setter } from '../types/Setter';

// import { HightlightRangePluginId } from './highlight-range';
// console.log(HightlightRangePluginId);

/**
 * @internal
 */
export function createControlFactory(
  date: Dayjs,
  setDate: (date: Dayjs) => unknown,
): (
  positive: boolean,
  unit: ManipulateType,
  boundary: Dayjs | null,
) => { disabled: boolean; execute(): void } {
  return (positive: boolean, unit: ManipulateType, boundary: Dayjs | null) => {
    const modifiedDate = (
      positive ? date.add(1, unit) : date.subtract(1, unit)
    ).date(1);

    return {
      disabled:
        boundary !== null &&
        (positive
          ? modifiedDate.isAfter(boundary.endOf(unit))
          : modifiedDate.isBefore(boundary.startOf(unit))),
      execute(): void {
        setDate(modifiedDate);
      },
    };
  };
}

export default function (_ = {}): CalendarPlugin<{
  rootConfiguration: { viewedDate: Dayjs; setViewedDate: Setter<Dayjs> };
  calendarInnerProps: { controls: CalendarControls };
}> {
  return {
    id: 'controls',
    calendarHook(state): { controls: CalendarControls } {
      const controlFactory = createControlFactory(
        state.viewedDate,
        state.setViewedDate,
      );

      return {
        controls: {
          nextYear: controlFactory(
            true,
            'year',
            null /*TODO add boundary here*/,
          ),
          prevYear: controlFactory(
            false,
            'year',
            null /*TODO add boundary here*/,
          ),
          nextMonth: controlFactory(
            true,
            'month',
            null /*TODO add boundary here*/,
          ),
          prevMonth: controlFactory(
            false,
            'month',
            null /*TODO add boundary here*/,
          ),
        },
      };
    },
  };
}
