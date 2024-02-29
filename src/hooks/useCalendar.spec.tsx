import { expect, test } from 'bun:test';
import { useCalendar } from './useCalendar';
import { render } from '@testing-library/react';
import dayjs from 'dayjs';

test('I can create a calendar', () => {
  const screen = render(<MyComponent />);

  expect(screen.getByTestId('calendar').childElementCount).toBe(5);

  expect(screen.getByTestId('week-0').firstChild!.textContent).toBe('5')
  expect(screen.getByTestId('week-1').firstChild!.textContent).toBe('6')
  expect(screen.getByTestId('week-2').firstChild!.textContent).toBe('7')
  expect(screen.getByTestId('week-3').firstChild!.textContent).toBe('8')
  expect(screen.getByTestId('week-4').firstChild!.textContent).toBe('9')

  expect(screen.getByTestId('week-0').lastChild!.childNodes.length).toBe(7)
  expect(screen.getByTestId('week-1').lastChild!.childNodes.length).toBe(7)
  expect(screen.getByTestId('week-2').lastChild!.childNodes.length).toBe(7)
  expect(screen.getByTestId('week-3').lastChild!.childNodes.length).toBe(7)
  expect(screen.getByTestId('week-4').lastChild!.childNodes.length).toBe(7)

  expect(screen.getByTestId('week-0-day-0').textContent).toBe('27');
  expect(screen.getByTestId('week-0-day-1').textContent).toBe('28');
  expect(screen.getByTestId('week-0-day-2').textContent).toBe('29');
  expect(screen.getByTestId('week-0-day-3').textContent).toBe('1');
  expect(screen.getByTestId('week-0-day-4').textContent).toBe('2');
  expect(screen.getByTestId('week-0-day-5').textContent).toBe('3');
  expect(screen.getByTestId('week-0-day-6').textContent).toBe('4');

  expect(screen.getByTestId('week-1-day-0').textContent).toBe('5');
  expect(screen.getByTestId('week-1-day-1').textContent).toBe('6');
  expect(screen.getByTestId('week-1-day-2').textContent).toBe('7');
  expect(screen.getByTestId('week-1-day-3').textContent).toBe('8');
  expect(screen.getByTestId('week-1-day-4').textContent).toBe('9');
  expect(screen.getByTestId('week-1-day-5').textContent).toBe('10');
  expect(screen.getByTestId('week-1-day-6').textContent).toBe('11');

  expect(screen.getByTestId('week-2-day-0').textContent).toBe('12');
  expect(screen.getByTestId('week-2-day-1').textContent).toBe('13');
  expect(screen.getByTestId('week-2-day-2').textContent).toBe('14');
  expect(screen.getByTestId('week-2-day-3').textContent).toBe('15');
  expect(screen.getByTestId('week-2-day-4').textContent).toBe('16');
  expect(screen.getByTestId('week-2-day-5').textContent).toBe('17');
  expect(screen.getByTestId('week-2-day-6').textContent).toBe('18');

  expect(screen.getByTestId('week-3-day-0').textContent).toBe('19');
  expect(screen.getByTestId('week-3-day-1').textContent).toBe('20');
  expect(screen.getByTestId('week-3-day-2').textContent).toBe('21');
  expect(screen.getByTestId('week-3-day-3').textContent).toBe('22');
  expect(screen.getByTestId('week-3-day-4').textContent).toBe('23');
  expect(screen.getByTestId('week-3-day-5').textContent).toBe('24');
  expect(screen.getByTestId('week-3-day-6').textContent).toBe('25');

  expect(screen.getByTestId('week-4-day-0').textContent).toBe('26');
  expect(screen.getByTestId('week-4-day-1').textContent).toBe('27');
  expect(screen.getByTestId('week-4-day-2').textContent).toBe('28');
  expect(screen.getByTestId('week-4-day-3').textContent).toBe('29');
  expect(screen.getByTestId('week-4-day-4').textContent).toBe('30');
  expect(screen.getByTestId('week-4-day-5').textContent).toBe('31');
  expect(screen.getByTestId('week-4-day-6').textContent).toBe('1');

});

const mockedDayjs = () => dayjs().year(2024).month(1).date(27);
const today = mockedDayjs();

const MyComponent = () => {
  const { weeks } = useCalendar({
    initialViewedDate: today,
    dayjs: mockedDayjs,
  });

  return (
    <div data-testid='calendar'>
      {Object.entries(weeks).map(([week, days], i) => (
        <div key={week} data-testid={`week-${i}`}>
          <p>{week}</p>
          <div>
            {Object.entries(days).map(([day, { date }], j) => (
              <button key={day} data-testid={`week-${i}-day-${j}`}>{date.date()}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
