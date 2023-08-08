import styles from './Basic.stories.module.scss';
import { useCallback, useState } from 'react';
import type { FC } from 'react';
import { DatePicker } from '../';
import type { CalendarInnerProps } from '../';
import type { Story } from '@ladle/react';
import { withStrictMode } from '../ladle/decorators/withStrictMode';
import clsx from 'clsx';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const MyCustomCalendar: FC<{ showWeekNumbers: boolean }> = ({
  showWeekNumbers,
}) => {
  return (
    <DatePicker.Calendar>
      {useCallback(
        ({ weekNumber }: CalendarInnerProps) => (
          <div className={styles.week}>
            {showWeekNumbers ? (
              <p className={styles.weekNumber}>{weekNumber}</p>
            ) : (
              <></>
            )}
            <DatePicker.Week>
              <div className={styles.day}>
                <DatePicker.Day>
                  {({
                    onClick: onDayClick,
                    date: dayDate,
                    belongsToSelectedMonth,
                    isSelected,
                    isOutOfRange,
                    isToday,
                  }) => (
                    <button
                      className={clsx({
                        [styles.selectionned]: isSelected,
                        [styles.today]: isToday,
                        [styles.month]: belongsToSelectedMonth,
                      })}
                      disabled={isOutOfRange}
                      onClick={onDayClick}
                    >
                      {dayDate.date()}
                    </button>
                  )}
                </DatePicker.Day>
              </div>
            </DatePicker.Week>
          </div>
        ),
        [showWeekNumbers]
      )}
    </DatePicker.Calendar>
  );
};

export const Simple: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <div className={styles.calendar}>
          <MyCustomCalendar showWeekNumbers={false} />
        </div>
      </DatePicker.Root>
    </>
  );
};

export const WithWeekNumbers: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <p>The week numbers are shown in red on the left</p>
      <DatePicker.Root setSelectedDate={setDate} selectedDate={date}>
        <div className={styles.calendar}>
          <MyCustomCalendar showWeekNumbers={true} />
        </div>
      </DatePicker.Root>
    </>
  );
};

export const WithMinAndMaxRange: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <p>
        The minimum date you can pick is{' '}
        {dayjs().subtract(1, 'week').toString()}
      </p>
      <p>
        The maximum date you can pick is {dayjs().add(1, 'week').toString()}
      </p>
      <DatePicker.Root
        setSelectedDate={setDate}
        selectedDate={date}
        minimumSelectableDate={dayjs().subtract(1, 'week')}
        maximumSelectableDate={dayjs().add(1, 'week')}
      >
        <div className={styles.calendar}>
          <MyCustomCalendar showWeekNumbers={false} />
        </div>
      </DatePicker.Root>
    </>
  );
};

Simple.decorators = [withStrictMode];
WithWeekNumbers.decorators = [withStrictMode];
WithMinAndMaxRange.decorators = [withStrictMode];