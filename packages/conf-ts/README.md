
# @enmove/conf-ts

conf-ts provides several types of base configuration files to inherit from your `tsconfig.json`.

This modules requires TypeScript 3.2 or newer.

## Usage

As of TypeScript 3.2, we are able to inherit base tsconfig files from packages located in `node_modules` in an intuitive way. To leverage this, add this package as a dev dependency first:

```sh
$ yarn add -D @enmove/conf-ts
```

Then, add your `tsconfig.json` to your project directory and extends the one of the base config files. For example:

```json
{
    "extends": "@enmove/conf-ts",
    "include": ["src/**/*"]
}
```

## Presets

conf-ts provides following configurations out of the box:

- `@enmove/cont-ts`
- `@enmove/conf-ts/decl`
- `@enmove/conf-ts/dom`

### `conf-ts`

The most basic configuration of this module and all of other more-specific configurations in this module inherit from this, which declares common compiler settings to utilize TypeScript features.

**WHEN TO USE**: Use this as the default tsconfig unless your code involves any react or DOM-related code.

```json
// Example of `tsconfig.json`
{
    "extends": "@enmove/cont-ts",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": { "@src/*": ["src/*"] }
    },
    "include": [
        "src/**/*",
        "test/**/*",
        "__*__/**/*",
        "../../typings/**/*"
    ],
    "exclude": [
        "test/types/**/*"
    ]
}
```

This example json file also assumes you have following directory structure:

- All source `.ts` and `.tsx` sources are in `src`
- `test` for test codes
- For special directory like `__fixtures__` and `__mocks__` also contains ts codes
- You have `typings` directory in which some missing type declarations you added for third-party js libraries are stored on the monorepo's root directory
- And ignores all `.ts` files in `test/types` so they can have own tsconfig

### `conf-ts/decl`

This configuration justs adds `declaration: true` to the basic configuration so it emits `.d.ts` along with transpiled `.js` files and their source maps.

**WHEN TO USE**: Use this for building a library in place of the basic config.

```json
// Example of `tsconfig.build.json`
{
    "extends": "@enmove/conf-ts/decl",
    "compilerOptions": {
        "outDir": "./dist"
    },
    "include": [
        "src/**/*",
        "../../typings/**/*"
    ],
    "exclude": [
        "**/__*__"
    ]
}
```

And you should want to add script to your `package.json` in order to use the tsconfig for building:

```json
{
    ...
    "scirpts": {
        "compile": "tsc --project tsconfig.build.json",
    },
    ...
}
```

### `conf-ts/dom`

This configuration adds `dom` library so you can reference to the browser APIs, and it tells that the application uses react.

**WHEN TO USE**: Your application needs react and access to the DOM.

## Tip: Preview your config file

You can print out the effective config with `--showConfig` option (as of TS 3.2):

```sh
$ tsc --showConfig

{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es6",
        ...
        "strict": true
    },
    "files": [
        "./src/index.ts",
    ],
    "include": [
        "src/**/*"
    ]
}
```
