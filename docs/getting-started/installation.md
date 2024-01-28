# Installation

## Requirements

This library depends on [React](https://www.npmjs.com/package/react) (obviously) with a minimal version of 18,
and [Day.js](https://www.npmjs.com/package/dayjs). We will also require some dayjs plugin you will have to enable manually like so:

::: code-group

```sh [npm]
$ npm add react dayjs
```

```sh [pnpm]
$ pnpm add react dayjs
```

```sh [yarn]
$ yarn add react dayjs
```

```sh [bun]
$ bun add react dayjs
```

:::

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

You can also enable a day.js locale to ensure stuff like week start is correct for your country:

```ts
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
```

::: code-group

```sh [npm]
$ npm add -D @zuruuh/react-date-picker
```

```sh [pnpm]
$ pnpm add -D @zuruuh/react-date-picker
```

```sh [yarn]
$ yarn add -D @zuruuh/react-date-picker
```

```sh [bun]
$ bun add -D @zuruuh/react-date-picker
```

:::
