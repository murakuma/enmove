
import { resolve } from "path";

import { generate } from "./generate";
import {
    generateDllEntries,
    VenderDllConfig,
} from "./generateDllEntries";
import {
    Mode,
    Target,
} from "./types";

export interface Config {
    vendor: VenderDllConfig;
    target?: Target;
}

interface Argv {
    mode: Mode;
}

/**
 * Generates a webpack configuration object.
 * 
 * ```ts
 * // In `webpack.config.js`
 * module.exports = require("@enmove/conf-gen-webpack")(__dirname);
 * ```
 * 
 * @param rootDir The project root directory.
 * @param config The configuration object to customize the output.
 */
function generateWebpackConfig( rootDir: string, config: Partial<Config> = {} ) {

    // Make it an absolute path
    rootDir = resolve( rootDir );

    // Generate dll entries
    const dllEntries = generateDllEntries( rootDir, config.vendor );

    // Other configs
    const { target } = config;

    // Returns a function to detect the webpack mode
    return ( env: any, argv: Argv ) => {
        const isDev = argv.mode === "development";

        return generate( {
            rootDir,
            target,
            dllEntries,
            isDev,
        } );
    };
}

export default generateWebpackConfig;
