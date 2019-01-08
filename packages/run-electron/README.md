
# @enmove/run-electron

A simple helper to run an electron **main** process with some customization.

## Usage

To launch an electron application with your local HTML file, you have to call `electron` command with the path to the *main* JS file in which you imports this module to simplify the chore of creating a BrowserWindow. Typically, the file is named `index.js` so we can open it as an electron main process by following command:

```sh
$ electron .
```

If you use different name for the main process JS file, just replace the dot (`.`):

```sh
$ electron run-app.js
```

In `index.js`, you may want to setup your BrowserWindow with this helper module:

```js
const { join } = require("path");

const DIST = join( __dirname, "dist" );

// Starts the electron app
require("@enmove/run-electron")(
    // The location where entry HTML file is
    join( DIST, index.html ),  // your-project/dist/index.html

    // The glob pattern to watch files for auto reloading
    join( DIST, "**/*" ),      // your-project/dist/**/*

    // The BrowserWindow configuration
    // For more detail about this option, visit:
    // https://electronjs.org/docs/api/browser-window#new-browserwindowoptions
    {
        width: 1024,
        height: 768,
    }
);
```

## See also

- [BrowserWindow | Electron](https://electronjs.org/docs/api/browser-window)
