
# @enmove/conf-jest

conf-jest provides several types of jest configuration module from which your actual jest configration imports.

## Usage

Add `jest.config.js` on your project root directory as usual. In this file, import a config preset you want to use and export it:

```js
module.exports = require("@enmove/conf-jest");
```

## Presets

conf-jest provides following configurations out of the box:

- `@enmove/conf-jest`
- `@enmove/conf-jest/integration`
- `@enmove/conf-jest/integration/enzyme`

### `conf-jest`

The most basic configuration of this module. 

It assumes that your `tsconfig.json` exists on your project root directory and your test files exists `__tests__` directries with `.test.+(ts|tsx|js)` prefix.

Use this as the default jest configration file to perform unit tests in your project.

### `conf-jest/integration`

Just another configuration that changes the directory on which jest searches for test files.

It assumes that all tests executed by this configuration are living in `test/integration`.


### `conf-jest/integration/enzyme`

This version of configuration for integration tests enables you to use enzyme and gives an opportunity to run setup script `test/integration/setup.ts` so it can import `jest-enzyme` package:

```ts
// test/integration/setup.ts
import "jest-enzyme";
```

## Tip: Specify jest config file

You can use `--config` option to tell jest that which jest config file should be used:

```sh
$ jest --config jest.integration.js
```
