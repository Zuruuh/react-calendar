# Software requirements

- [Bun](https://bun.sh) ^1.0.25
- [Typos CLI](https://github.com/crate-ci/typos)
- [Lychee](https://github.com/lycheeverse/lychee)

## Installation

Fork and clone the project locally, then install the dependencies with `bun install` and run the tests to ensure everything works correctly (with `bun test`).

## Linting & Formatting

This project uses [Biome.js](https://biomejs.dev) both for formatting and linting. Use it with the scripts `bun lint:biome` and `bun format`

## Typos

We use the Typos CLI to check for typos in code and documentations. You can install it from their github repository

## Broken links

Lastly, Lychee is a broken link checker; it is used in the CI to ensure the docs work fine
