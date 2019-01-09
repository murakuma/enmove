
# @enmove/run-electron

A simple helper to run an electron **main** process.

## Usage

Firstly create a `.js` file for an electron *main* process, for example, `index.js` or `start-electron.js`. This file will be invoked as you runs electron CLI like following:

```sh
# dot (.) for `index.js`
$ electron .
# or, specify the file name
$ electron start-electron.js
```

In the main process file, import `run-electron` module to get `runElectron` function, which is the default export of this module, and invoke it with the entry URL (either a local HTML file, or remote address) with proper protocol (`"file:/"`, `"http://"`, or `"https://"`). In addition, you can specify the [`BrowserWindow` configration](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) to customize your electron window:

```js
// Starts the electron app
require("@enmove/run-electron")(
    `file://${__dirname}/dist/index.html`,

    // The BrowserWindow configuration
    {
        width: 1024,
        height: 768,
    }
);
```

### Working with `webpack-dev-server`

In development process, you may want to use `webpack-dev-server` rather than watch mode and load the entry html file from the dev server. By doing this, not only your work-in-progress application code no longer needs to be emitted to the storage, but also it enables you to use live-reloading that comes with webpack's dev server.

To achieve this, you have to deal with following tasks:

1. Run two processes simultaneously.
    - The dev server process, and the electron main process
2. Open *BrowserWindow* after the dev server starts serving files.

Running two processes can be effortlessly done with one of the npm helper tools like `npm-run-all`, which adds a bin to run two or more npm scripts in a parallel way.

```sh
$ yarn add -D npm-run-all
```

With `npm-run-all`, add following scripts to your `package.json`:

```json
{
    "scripts": {
        "start": "run-p start:dev-server start:electron",
        "start:dev-server": "webpack-dev-server --mode development",
        "start:electron": "electron ."
    }
}
```

So, what make it possible to solve the second task? Fortunately, if you provide a URL with `http` or `https` protocol to `runElectron` function, it automatically checks the availability of the server and keeps reconnecting until it becomes actually online.

```js
// Starts the electron app with webpack dev server
require("@enmove/run-electron")(
    `http://localhost:3030`,
    {
        width: 1024,
        height: 768,
    }
);
```

## See also

- [BrowserWindow | Electron](https://electronjs.org/docs/api/browser-window)
- [Building an Electron application with create-react-app](https://medium.freecodecamp.org/building-an-electron-application-with-create-react-app-97945861647c)
