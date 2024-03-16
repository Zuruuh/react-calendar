import { expect, test } from 'bun:test';
import { type WeekState, useCalendar } from './useCalendar';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';

const mockedDayjs = () => dayjs().year(2024).month(1).date(27);
const today = mockedDayjs();

function formatWeeksForSnapshot(weeks: Array<WeekState>): unknown {
  return weeks.map((week) => ({
    ...week,
    days: week.days.map((day) => ({
      ...day,
      date: day.date.format('D-MM-YYYY'),
    })),
  }));
}

test('Calendar with default overlap mode', () => {
  const MyComponent = () => {
    const { weeks } = useCalendar({
      initialViewedDate: today,
      dayjs: mockedDayjs,
      overlap: 'overlap',
    });

    expect(formatWeeksForSnapshot(weeks)).toMatchSnapshot();

    return <input />;
  };

  render(<MyComponent />);
});

test('Calendar with no-overlap mode', () => {
  const MyComponent = () => {
    const { weeks } = useCalendar({
      initialViewedDate: today,
      dayjs: mockedDayjs,
      overlap: 'no-overlap',
    });

    expect(formatWeeksForSnapshot(weeks)).toMatchSnapshot();

    return <input />;
  };

  render(<MyComponent />);
});
