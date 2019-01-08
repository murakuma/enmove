
import {
    app,
    BrowserWindow,
    BrowserWindowConstructorOptions,
} from "electron";

const FILE_PROTOCOL = "file://";
function ensureFileProtocol( fileURL: string ) {
    if ( !fileURL.startsWith( FILE_PROTOCOL ) ) {
        return FILE_PROTOCOL + fileURL;
    } else {
        return fileURL;
    }
}

/**
 * Creates an electron BrowserWindow instance.
 * 
 * ```js
 * const { join } = require("path");
 * 
 * const DIST = join( __dirname, "dist" );
 * 
 * // Starts the electron app
 * require("@enmove/run-electron")(
 *     // The location where entry HTML file is
 *     join( DIST, index.html ),
 * 
 *     // The glob pattern to watch files for auto reloading
 *     join( DIST, "**\/*" ),
 * 
 *     // The BrowserWindow configuration
 *     {
 *         width: 1024,
 *         height: 768,
 *     }
 * );
 * ```
 * 
 * @param entryHtmlFile The location where your entry HTML file is.
 * @param watchPath The glob pattern to watch changes in the filesystem.
 * @param windowOptions The options for creating a BrowserWindow.
 * [All available options are here](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions).
 */
function runElectron(
    entryHtmlFile: string,
    watchPath?: string | undefined | null,
    windowOptions?: BrowserWindowConstructorOptions
) {
    // Add `file://` prefix if missing
    entryHtmlFile = ensureFileProtocol( entryHtmlFile );

    if ( watchPath ) {
        // Enable auto-reloading
        const electronReload = require( "electron-reload" );
        electronReload( watchPath );
    }

    let mainWindow: BrowserWindow | null;

    app.on( "window-all-closed", () => {
        if ( process.platform !== "darwin" ) {
            app.quit();
        }
    } );

    app.on( "ready", () => {
        mainWindow = new BrowserWindow( windowOptions );

        mainWindow.loadURL( entryHtmlFile );

        mainWindow.on( "closed", () => {
            mainWindow = null;
        } );
    } );
}

export default runElectron;
