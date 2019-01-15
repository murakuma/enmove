
# `@enmove/conf-storybook`

> A set of configuration files for storybook.

## Project structure

This module infers that your project structure is following:

```
my-project
├── .storybook
│   ├── config.ts
│   └── webpack.config.js
├── static
│   └── ...
├── stories
│   ├── foo.stories.tsx
│   ├── bar.stories.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── webpack.config.js
```

> **NOTE**:
> The `webpack.config.js` under `.storybook` directory is the one that is used by storybook and not used to build your application.

## Usage

### `webpack.config.js`

In order to use storybook with a webpack configuration that is compatible with the main webpack config, you may want to use `@enmove/conf-storybook/webpack` module:

```js
// In `.storybook/webpack.config.js`
module.exports = require("@enmove/conf-storybook/webpack");
```

It adds TypeScript and SASS support, which you need to preview your react component in storybook page.

### `config.ts`

If you feel lazy, use `@enmove/conf-storybook` to write your storybook config file (`.storybook/config.ts`):

```ts
import configure from "@enmove/conf-storybook";

configure(
    // Automatically imports all files ending in *.stories.tsx
    require.context("../stories", true, /\.stories\.tsx$/),
    module
);
```

You can write this config script interchangeably without any use of `@enmove/conf-storybook`:

```ts
import { configure } from "@storybook/react";

const req = require.context("../stories", true, /\.stories\.tsx$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
```

#### `require.context`

With webpack, you can use `require.context` method to create a context that contains multiple files matched with the given conditions.

```ts
require.context(directory[, useSubdirectories, regExp])
```

This is definitely useful when it comes to collect source files for stories.

> **NOTE**:
> The first argument must be a literal string like `"./test"`, or `../stories`, and not a dynamic string like `process.cwd()`, which confuse webpack to determine where the files imported live in.

See also [webpack's documentation](https://webpack.js.org/guides/dependency-management/#require-context) about this topic.

### Serving static files

If you want to import your static assets from `static` directory, add `-s ./static` argument to your npm script that runs storybook:

```json
{
    "scripts": {
        "storybook": "start-storybook -s ./static -p 9001"
    }
}
```

See also: [Serving Static Files](https://storybook.js.org/configurations/serving-static-files/)

## Additional info

This package is included in:

- [`for-electron`](../for-electron#readme)
- [`for-web`](../for-web#readme)
