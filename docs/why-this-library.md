# Why you might need this library
While reading this documentation, you might ask yourself the following question:

> But **why** would I need to install *yet another* dependency for selecting dates when my browser does just fine ?

And this is a completely valid question!
Browsers [supports \<input type="date" />](https://caniuse.com/input-datetime) since quite a while now and
it solves almost all cases with the simplest developer experience you could ever imagine (adding `type="date"` to your input)
with great mouse and keyboard control, accessibility, etc...

**BUT**, nonetheless, the native implementation does not provide all the features you might need for your app.
Let's review the features missing from the native date input implementation:

### Selecting a range of dates <Badge type="danger" text="❌ Not implemented yet (see #16)" />

This is probably the reason most developers use a library for date picking. Native html inputs doesn't allow you to
select multiple dates on a single calendar. This can easily be fixed by using two separate inputs though,
but that also means you're sacrificing some of the user experience.

### Picking multiple dates <Badge type="danger" text="❌ Not implemented yet (see #17)"/>

Picking an undetermined amount of dates can be quite painful using only html inputs,
as forms fields are supposed to send a single value per input.
The native solution would be to have controls to add/remove new date inputs,
but again, the user experience is greatly deteriored
as it takes a lot more time to add a large amount of dates.
Whereas a custom datepicker would allow you to simply click the days you want,
maybe even a week or a month, and you'd be one.

### Styling <Badge type="tip" text="✅ Since v0.1.0"/>

Styling native browser components like date pickers and scrollbars can be quite annoying
since you need to ensure your solution works on all browsers, and may even be impossible
in some cases. Since this library simply uses your own html, you can style it however you want.

## In short
Do you have any of the problems listed above ?
 - If not, then you'll do just fine with `<input type="date" />` 😊
 - Else, head to the [Getting Started](/installation) section and start building the date picker of your dreams 🚀
