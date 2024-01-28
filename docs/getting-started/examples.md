# Examples

# Basic

```tsx
import { type FC, useState } from "react";
import { type Dayjs } from "dayjs";
import { DatePicker } from "@zuruuh/react-date-picker";
import styles from "./styles.module.css";

export const MyDatePicker: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  return (
    <DatePicker.Root
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    >
      <DatePicker.Calendar>
        <div className={styles.week}>
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
                    type="button"
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
      </DatePicker.Calendar>
    </DatePicker.Root>
  );
};
```
