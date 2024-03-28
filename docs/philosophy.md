# Library philosophy

This library is built to bundle **only the logic to generate a calendar**. The rendering, styling, etc... is left completely up to you so you can build
your dream design without having to think about all the caveats of building such a component.

Getting started using it might be a little longer than simply copy-pasting a 10 lines code block like you would do with other similar libraries,
but in return you get everything you need to implement a specific design/behaviour.

> [!NOTE]
> The library utilizes callbacks to render each day, week, month, etc... while keeping all the state available to you so you can control the calendar's behaviour as needed.

Let's review how the days in the calendar are rendered.

1. Based on the configuration of the calendar, we determine what days should be rendered (e.g: `all the days between the 1st and the 31st of January`)
2. We call the function you passed to render the entire calendar (here you render the frame, the controls, the currently viewed date, or anything else as needed)
3. We call N times (around ~5) the function you passed to render the weeks, most of the time you won't render much here, but if needed you have access to data such as week number.
4. We call M times (around ~30) the function you passed to render the days, with all the data you need for a classic date picker, such as:
   - the date (obviously) as a DayJS object
   - the `alt` value for screen readers (which you can directly pass to an attribute such as `aria-label`)
   - a default `onClick` handler that works out-of-the-box
   - boolean flags to control the styling of the day (`isToday`, `belongsToSelectedMonth`, `isOutOfRange`, etc...)
   - a "corners" object, that you can use if needed to add pretty rounded corners to your calendar
5. The computed days are rendered and you can use your calendar
