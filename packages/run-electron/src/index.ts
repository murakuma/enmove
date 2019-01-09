
import { URL } from "url";

import {
    app,
    BrowserWindow,
    BrowserWindowConstructorOptions,
} from "electron";

import { waitForServer } from "./waitForServer";

/**
 * Creates an electron BrowserWindow instance.
 *
 * If you provide a URL with http (or https) protocol, it checks if the host is
 * available or not and ensures that the BrowserWindow is created after the host
 * becomes available. It's handy when you are working with webpack dev server,
 * which has noticable delay to serve the compiled files.
 *
 * ```js
 * // Starts the electron app
 * require("@enmove/run-electron")(
 *     // The location where entry HTML file is
 *     `file://${__dirname}/dist/index.html` ),
 *
 *     // The BrowserWindow configuration
 *     {
 *         width: 1024,
 *         height: 768,
 *     }
 * );
 * ```
 *
 * @param entryURL The location where your entry HTML file is.
 * @param windowOptions The options for creating a BrowserWindow. [Available
 * options are
 * here](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions).
 */
function runElectron(
    entryURL: string,
    windowOptions?: BrowserWindowConstructorOptions
) {
    const url = new URL( entryURL );

    let mainWindow: BrowserWindow | null;

    app.on( "window-all-closed", () => {
        if ( process.platform !== "darwin" ) {
            app.quit();
        }
    } );

    app.on( "ready", () => {

        const createWindow = () => {
            mainWindow = new BrowserWindow( windowOptions );

            mainWindow.loadURL( entryURL );

            mainWindow.on( "closed", () => {
                mainWindow = null;
            } );
        };

        if ( url.protocol.startsWith( "file" ) ) {
            createWindow();
        } else {
            waitForServer( url, createWindow );
        }
    } );
}

module.exports = runElectron;
