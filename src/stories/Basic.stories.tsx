import styles from './Basic.stories.module.scss';
import { useState, type FC } from 'react';
import { Calendar, type WeeksInnerProps, CalendarControls } from '../';
import type { Story } from '@ladle/react';
import { withStrictMode } from '../ladle/decorators/withStrictMode';
import clsx from 'clsx';
import dayjs, { type Dayjs } from 'dayjs';

const MyControls: FC<{ controls: CalendarControls }> = ({ controls }) => {
  return (
    <div>
      <button
        type="button"
        disabled={controls.prevMonth.disabled}
        onClick={controls.prevMonth.execute}
      >
        prev month
      </button>
      <button
        type="button"
        disabled={controls.nextMonth.disabled}
        onClick={controls.nextMonth.execute}
      >
        next month
      </button>
    </div>
  );
};

const MyCustomCalendar: FC<{ showWeekNumbers: boolean }> = ({
  showWeekNumbers,
}) => {
  return (
    <Calendar.Weeks>
      {({ weekNumbers }: WeeksInnerProps) => (
        <div className={styles.week}>
          {showWeekNumbers ? (
            <div className={styles.weekNumberWrapper}>
              <p className={styles.weekNumber}>{weekNumbers.join('-')}</p>
            </div>
          ) : (
            <></>
          )}
          <Calendar.Week>
            <div className={styles.day}>
              <Calendar.Day>
                {({
                  // onClick: onDayClick,
                  date: dayDate,
                  belongsToSelectedMonth,
                  // isSelected,
                  // isOutOfRange,
                  isToday,
                }) => (
                  <button
                    type="button"
                    className={clsx({
                      // [styles.selectionned]: isSelected,
                      [styles.today]: isToday,
                      [styles.month]: belongsToSelectedMonth,
                    })}
                    // disabled={isOutOfRange}
                    // onClick={onDayClick}
                  >
                    {dayDate.date()}
                  </button>
                )}
              </Calendar.Day>
            </div>
          </Calendar.Week>
        </div>
      )}
    </Calendar.Weeks>
  );
};

export const Simple: Story = (): React.ReactNode => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <Calendar.Root /*setSelectedDate={setDate} selectedDate={date}*/>
        {(/*{ controls }*/) => (
          <>
            {/*<MyControls controls={controls} />*/}
            <div className={styles.calendar}>
              <MyCustomCalendar showWeekNumbers={false} />
            </div>
          </>
        )}
      </Calendar.Root>
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
      <Calendar.Root /*setSelectedDate={setDate} selectedDate={date}*/>
        {(/*{ controls }*/) => (
          <>
            {/*<MyControls controls={controls} />*/}
            <div className={styles.calendar}>
              <MyCustomCalendar showWeekNumbers={true} />
            </div>
          </>
        )}
      </Calendar.Root>
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
      <Calendar.Root
      // setSelectedDate={setDate}
      // selectedDate={date}
      // minimumSelectableDate={dayjs().subtract(1, 'week')}
      // maximumSelectableDate={dayjs().add(1, 'week')}
      >
        {(/*{ controls }*/) => (
          <>
            {/*<MyControls controls={controls} />*/}
            <div className={styles.calendar}>
              <MyCustomCalendar showWeekNumbers={false} />
            </div>
          </>
        )}
      </Calendar.Root>
    </>
  );
};

export const WithNoOverlap: Story = () => {
  const [date, setDate] = useState<Dayjs | null>(null);

  return (
    <>
      <p>
        The current selected date is: {date?.toString() ?? '(not selected yet)'}
      </p>
      <Calendar.Root
      // setSelectedDate={setDate}
      // selectedDate={date}
      // overlap="no-overlap"
      >
        {(/*{ controls }*/) => (
          <>
            {/*<MyControls controls={controls} />*/}
            <div className={styles.calendar}>
              <MyCustomCalendar showWeekNumbers={true} />
            </div>
          </>
        )}
      </Calendar.Root>
    </>
  );
};

WithNoOverlap.decorators = [withStrictMode];
Simple.decorators = [withStrictMode];
WithWeekNumbers.decorators = [withStrictMode];
WithMinAndMaxRange.decorators = [withStrictMode];
