
import { resolve } from "path";

import { generate } from "./generate";
import {
    generateDllEntries,
    VenderDllConfig,
} from "./generateDllEntries";
import { isDev as getIsDev } from "./isDev";
import { Target } from "./types";

export interface Config {
    /**
     * The root directory.
     * @default process.cwd()
     */
    rootDir: string;

    /**
     * Determine if the webpack mode is `"development"`.
     *
     * Specify if you want to override the mode to generate webpakc
     * configuration. If it is not supplied, it uses `process.argv` to detect
     * the current webpack mode.
     */
    isDev: boolean;

    /**
     * The build target.
     * @default "web"
     */
    target: Target;

    /**
     * The list of modules to include to or exclude from `vendor.js` bundle.
     */
    vendor: VenderDllConfig;
}

/**
 * Generates a webpack configuration object.
 * 
 * ```ts
 * // In `webpack.config.js`
 * module.exports = require("@enmove/conf-webpack")({ ...config });
 * ```
 * 
 * @param config The configuration object to customize the output.
 */
function generateWebpackConfig( config: Partial<Config> = {} ) {

    const rootDir = resolve( config.rootDir ? config.rootDir : process.cwd() );
    const isDev = config.isDev !== undefined ? config.isDev : getIsDev();

    console.log( `[@enmove/conf-webpack] development mode is ${isDev ? "ON" : "OFF"}` );

    // Generate dll entries
    const dllEntries = generateDllEntries( rootDir, config.vendor );

    // Other configs
    const { target } = config;

    // Returns a webpack configuration object
    return generate( {
        rootDir,
        target,
        dllEntries,
        isDev,
    } );
}

module.exports = generateWebpackConfig;
