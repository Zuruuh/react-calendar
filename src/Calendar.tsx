import { useCallback, useState, type FC, type ReactNode } from 'react';
import {
  CalendarContext,
  type CalendarOverlap,
  type CalendarState,
} from './context/CalendarContext';
import type { Setter } from './types/Setter';
import { Weeks } from './components/Weeks';
import { Week } from './components/Week';
import { Day } from './components/Day';
import day, { type Dayjs } from 'dayjs';
import { CalendarPlugin } from './plugin';

export interface CalendarProps {
  // selectedDate: Dayjs | null;
  // setSelectedDate: Setter<Dayjs | null>;
  viewedDate?: Dayjs;
  dayjs?(): Dayjs;
  plugins?: Array<CalendarPlugin>;
  // overlap?: CalendarOverlap;
  // altDateFormat?: string;
  children: ReactNode | ((props: CalendarState) => ReactNode);
}

const Calendar: FC<CalendarProps> = (props) => {
  const {
    children,
    // overlap = 'overlap',
    // altDateFormat = 'dddd D MMMM YYYY',
    plugins = [],
    viewedDate,
    dayjs = () => day(),
  } = props;

  const dayFactory = useCallback(
    () => dayjs().utc(true).second(0).minute(0).hour(12),
    [dayjs],
  );

  // const additionnalProps = plugins.map((plugin) => plugin?.calendarHook !== undefined ? plugin.calendarHook() : {});

  // const [temporarySelectedDate, setTemporarySelectedDate] = useState(
  //   dayFactory().day(dayjs().localeData().firstDayOfWeek()),
  // );

  // const setTemporarySelectedDateDecorator: Setter<Dayjs> = (date) => {
  //   const unwrappedDate =
  //     typeof date === 'function' ? date(temporarySelectedDate) : date;
  //   return setTemporarySelectedDate(unwrappedDate.date(1));
  // };

  const state: CalendarState = {
    // temporarySelectedDate,
    // setTemporarySelectedDate: setTemporarySelectedDateDecorator,
    // controls: {
    //   nextMonth: controlFactory(true, 'month', maximumSelectableDate),
    //   nextYear: controlFactory(true, 'year', maximumSelectableDate),
    //   prevMonth: controlFactory(false, 'month', minimumSelectableDate),
    //   prevYear: controlFactory(false, 'year', minimumSelectableDate),
    // },
    // overlap,
    // altDateFormat,
    plugins,
    viewedDate: viewedDate ?? dayFactory(),
    dayjs: dayFactory,
  };

  return (
    <CalendarContext.Provider value={state}>
      {typeof children === 'function' ? children(state) : children}
    </CalendarContext.Provider>
  );
};

export default {
  Root: Calendar,
  Weeks,
  Week,
  Day,
};
