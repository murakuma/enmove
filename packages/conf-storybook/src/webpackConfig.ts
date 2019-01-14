
import { Configuration } from "webpack";

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TSDocgenPlugin from "react-docgen-typescript-webpack-plugin";

// tslint:disable-next-line:no-var-requires
const enmoveConfig: Configuration = require("@enmove/conf-webpack/web/dev");

import { findModuleRule } from "./findModuleRule";

function webpackConfig(
    baseConfig: Configuration,
    env: any,
    defaultConfig: Configuration
): Configuration {

    const config = defaultConfig;

    // Add loaders
    const enmoveRules = enmoveConfig.module!.rules!;
    config.module!.rules.push(
        findModuleRule( enmoveRules, "foo.ts" )!,
        findModuleRule( enmoveRules, "foo.scss" )!,
    );

    // Add resolve extensions
    config.resolve!.extensions!.push( ".ts", ".tsx" );

    // Add plugins
    config.plugins!.push(
        new MiniCssExtractPlugin(),
        new TSDocgenPlugin(),
    );

    return config;
}

exports = module.exports = webpackConfig;
export default webpackConfig;
