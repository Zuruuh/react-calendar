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

### `altDateFormat`

- **Type:** `string|undefined`
- **Default:** `dddd D MMMM YYYY`

The [DayJS format](https://day.js.org/docs/en/display/format) to use to compute the `alt` value for screen readers.
The default renders dates with the following format: `Monday 29 January 2024`.

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

> [!NOTE]
> All the props you passed to [`DatePicker.Root`](#datepickerprops) are available in the `DatePickerState` object

### `temporarySelectedDate`

- **Type:** `Dayjs`

The date of the currently viewed month.

### `setTemporarySelectedDate`

- **Type:** `Setter<Dayjs>`

The setter for [`temporarySelectedDate`](#temporaryselecteddate); this is useful in case you want to hook
up some custom logic for browsing.

### `controls`

- **Type:** [`DatePickerControls`](#datepickercontrols)

An object containing basic control callbacks for your calendar.
It contains handlers to advance to prev/next month and prev/next year.
This is just a thin abstraction over [`setTemporarySelectedDate`](#settemporaryselecteddate)
and [`minimumSelectableDate`](#minimumselectabledate)/[`maximumSelectableDate`](#maximumselectabledate).
It exists only because it's a really frequent use case, but this could very easily be re-implemented
on user-land since you already have access to all functions and data.

#### `DatePickerControls`

- **Type:**

```ts
export interface DatePickerControls {
  nextMonth: DatePickerControl;
  nextYear: DatePickerControl;
  prevMonth: DatePickerControl;
  prevYear: DatePickerControl;
}
```

#### `DatePickerControl`

- **Type:**

```ts
export interface DatePickerControl {
  execute(): void;
  disabled: boolean;
}
```

A single control object.
The `disabled` boolean exists only for semantics. You should be the one disabling the html button
when `disabled === false`, as `execute` can be called anyway, allowing you to use the controls from
your code instead of only letting the user interact with it.
// TODO reword this above ?

<!-- > [!TIP] -->
<!-- > You usually want to pass the computed -->
