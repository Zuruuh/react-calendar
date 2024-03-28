# Calendar Reference

[[toc]]

## CalendarInnerProps

### `children`

- **Type:** `ReactNode | ((props: CalendarInnerProps) => ReactNode)`

The props callback used to render the weeks.

## CalendarInnerProps

### `weekNumbers`

- **Type:** `[number] | [number, number]`

The week number of the currently rendered week. Most of the time there will be only a single value, but in some cases where you might be rendering a calendar week that overlaps 2 year weeks, you can access the 2nd year week with the 2nd element

### `weekIndex`

- **Type:** `number`

Mostly for internal use, the index of the week rendered. Basically it translates to the vertical index on the actual calendar (first/second/third/fourth week, etc...)

### `totalWeeks`

- **Type:** `number`

The number of weeks being rendered for the current calendar page.
