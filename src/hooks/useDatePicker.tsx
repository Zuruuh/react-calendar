import {
  useCalendar,
  type Calendar,
  type CalendarOptions,
} from './useCalendar';

export interface DatePickerOptions extends CalendarOptions {}

export interface DatePicker extends Calendar {}

const useDatePicker = (options: DatePickerOptions): DatePicker => {
  const calendar = useCalendar(options);

  return calendar;
};
