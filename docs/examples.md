# Examples

### React Typescript example

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

### React-Native Expo

```jsx
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { DatePicker } from "@zuruuh/react-date-picker";
import week from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
import locale from "dayjs/plugin/localeData";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(locale);
dayjs.locale("fr");

export default function App() {
	const [selectedDate, setSelectedDate] = useState(null);
	return (
		<View style={styles.calendar}>
			<DatePicker.Root
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
			>
				<DatePicker.Calendar>
					<div style={styles.week}>
						<DatePicker.Week>
							<div style={styles.day}>
								<DatePicker.Day>
									{({ onClick: onDayClick, date: dayDate, isOutOfRange }) => (
										<button
											type="button"
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
		</View>
	);
}

const styles = StyleSheet.create({
	calendar: {
		display: "flex",
	},
	week: {
		display: "flex",
		flexDirection: "row",
	},
	day: {
		width: "32px",
		height: "32px",
	},
}
```
