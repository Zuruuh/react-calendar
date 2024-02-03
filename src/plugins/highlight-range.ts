import type { CalendarPlugin } from '../plugin';
import type { Dayjs } from 'dayjs';

// @ts-expect-error
declare module '@zuruuh/react-calendar' {
  interface DayInnerProps {
    isOutOfRange: boolean;
  }
}

export default function ({
  minInclusiveDate,
  maxInclusiveDate,
}: {
  minInclusiveDate?: Dayjs;
  maxInclusiveDate?: Dayjs;
}): CalendarPlugin {
  return {
    id: 'highlight-range',
    dayHook(_, { date }) {
      return {
        isOutOfRange:
          date.isBefore(minInclusiveDate) || date.isAfter(maxInclusiveDate),
      };
    },
  };
}
