# Week Reference

[[toc]]

## WeekProps

::: info
This component's api isn't great/required, but basically it does some computation for day props that needs to be outside, and the makes it available through a context. This will probably change in the future
:::

### `children`

**Type**: `ReactNode`

A wrapper for the jsx rendered for each day. Most of the time this is just going to be a single [<DatePicker.Day></DatePicker.Day>](/reference/day) element.
