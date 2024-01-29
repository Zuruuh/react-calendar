# Installation

## Requirements

This library depends on [React](https://www.npmjs.com/package/react) (obviously) with a minimal version of 18,
and [Day.js](https://www.npmjs.com/package/dayjs).

::: code-group

```sh [npm]
$ npm add react dayjs @zuruuh/react-date-picker
```

```sh [pnpm]
$ pnpm add react dayjs @zuruuh/react-date-picker
```

```sh [yarn]
$ yarn add react dayjs @zuruuh/react-date-picker
```

```sh [bun]
$ bun add react dayjs @zuruuh/react-date-picker
```

:::

## Dayjs configuration
We will also require some dayjs plugin you will have to enable manually like so

```ts
// index.ts
import week from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";
import locale from "dayjs/plugin/localeData";
import dayjs from "dayjs";

dayjs.extend(week);
dayjs.extend(utc);
dayjs.extend(locale);
```

## Dayjs locale
You can also enable a day.js locale to default alt format respects your language's format.
It also correctly sets some regional data like the first day of the week in said country.
You can find all locales supported by dayjs [on their github repository](https://github.com/iamkun/dayjs/tree/dev/src/locale)

```ts
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
```
