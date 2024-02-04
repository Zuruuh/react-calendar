import type { CalendarPlugin } from '../plugin';
import type { Dayjs } from 'dayjs';

export default function ({
  minInclusiveDate,
  maxInclusiveDate,
}: {
  minInclusiveDate?: Dayjs;
  maxInclusiveDate?: Dayjs;
}): CalendarPlugin<{ dayInnerProps: { isOutOfRange: boolean } }> {
  return {
    id: 'highlight-range',
    dayHook(_, { date }) {
      const isOutOfRange =
        (minInclusiveDate !== undefined && date.isBefore(minInclusiveDate)) ||
        (maxInclusiveDate !== undefined && date.isAfter(maxInclusiveDate));

      return {
        isOutOfRange,
      };
    },
  };
}
