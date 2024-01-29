# Date Picker Reference

[[toc]]

## DatePickerProps

### `selectedDate`
- **Type:** `Dayjs | null`

The currently selected date. This value goes in pair with [setSelectedDate](#setselecteddate)
as most of the time it's just going to be a `useState`

### `setSelectedDate`
- **Type:** `Setter<Dayjs | null>`

The setter for [`selectedDate`](#selectedDate)

### `dayjs`
- **Type:** `undefined|(): Dayjs`
- **Default:** `() => import('dayjs')()`

The function to call to create new `DayJS` dates.
By default this value uses the real `dayjs` implementation.
This value can be useful to override when mocking or testing.

### `minimumSelectableDate`
- **Type:** `Dayjs|undefined`
- **Default:** `undefined`

The minimum date that can be selected. This range is inclusive,
meaning the date passed to this value can be selected

### `maximumSelectableDate`
- **Type:** `Dayjs|undefined`
- **Default:** `undefined`

The maximum date that can be selected. This range is inclusive,
meaning the date passed to this value can be selected

### `overlap`
- **Type:** `"no-overlap-with-offset" | "overlap" | "no-overlap"`
- **Default:** `"overlap"`

The behavior the calendar should have when it comes to rendering days that are outside of the currently viewed month.
- `"overlap"`: Show the last days of the previous month and the first days of the next month if needed
- `"no-overlap"`: Do not show first and last days of next/previous months. This will shift the calendar by a few days in most cases (see example below)
- `"no-overlap-with-offset"`: Do not show the last days of the previous but keep the offset so there is not shift

> [!WARNING]
> It may looks like you could achieve manually the behavior of `"no-overlap-with-offset"` with the `"overlap"` mode,
> but you really should use the one you need as it changes the way rounded corners are calculated

Take a look at this example showing what each render mode outputs:

#### Overlap mode **`"overlap"`**:
| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
| --- | --- | --- | --- | --- | --- | --- |
| 30  | 31  | 01  | 02  | 03  | 04  | 05  |
| 06  | 07  | 08  | 09  | 10  | 11  | 12  |
| ... | ... | ... | ... | ... | ... | ... |
| 27  | 28  | 29  | 30  | 01  | 02  | 03  |

As you can see, we render the last days of the previous month at the start (Mon 30, Tue 31),
and the first days of the next month (Fri 01, Sat 02, Sun 03)

#### Overlap mode **`"no-overlap-with-offset"`**:
| Mon | Tue | Wed | Thu | Fri | Sat | Sun |
| --- | --- | --- | --- | --- | --- | --- |
|     |     | 01  | 02  | 03  | 04  | 05  |
| 06  | 07  | 08  | 09  | 10  | 11  | 12  |
| ... | ... | ... | ... | ... | ... | ... |
| 27  | 28  | 29  | 30  |     |     |     |

This is pretty much the same as `"overlap"`, but here we don't render the days outside of the current month.
Though, we keep the offset so that the calendar still starts on `Monday`

#### Overlap mode **`"no-overlap"`**:
| Wed | Thu | Fri | Sat | Sun | Mon | Tue |
| --- | --- | --- | --- | --- | --- | --- |
| 01  | 02  | 03  | 04  | 05  | 06  | 07  |
| 08  | 09  | 10  | 11  | 12  | 13  | 14  |
| ... | ... | ... | ... | ... | ... | ... |
| 29  | 30  |     |     |     |     |     |

This is what was meant by `This will shift the calendar by a few days`;
The calendar now starts on Wednesday, as it's the first day of the month.

## DatePickerState
TODO
