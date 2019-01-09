
import { resolve } from "path";

import { generate } from "./generate";
import {
    generateDllEntries,
    VenderDllConfig,
} from "./generateDllEntries";

interface Config {
    vendor: VenderDllConfig;
    hot: boolean;
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
    const { hot } = config;

    // Generate the config
    return generate( {
        rootDir,
        dllEntries,
        hot,
    } );
}

export default generateWebpackConfig;
