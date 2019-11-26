
import { resolve } from "path";

import webpack from "webpack";

import AutoDllPlugin from "autodll-webpack-plugin";
import DotenvPlugin from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import compact from "lodash.compact";

import { Target } from "./types";

export const generate = ( {
    rootDir,
    target,
    dllEntries,
    isDev,
}: {
    rootDir: string,
    target: Target,
    dllEntries: { [key: string]: ReadonlyArray<string> },
    isDev: boolean,
} ): webpack.Configuration => ({

    context: rootDir,
    entry: "./src/index.tsx",

    output: {
        filename: "bundle.js",
        path: resolve( rootDir, "dist" ),

        // Disable this option is webpack-dev-server is used
        publicPath: isDev ? undefined : "./",
    },

    target,

    resolve: {
        extensions: [ ".js", ".json", ".ts", ".tsx" ],
        alias: {
            "@src": resolve( rootDir, "src" ),
        },
    },

    module: {
        rules: [ {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [ {
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            } ],
        }, {
            test: /\.css$/,
            use: compact( [
                isDev && "css-hot-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
            ] ),
        }, {
            test: /\.(sa|sc)ss$/,
            use: compact( [
                isDev && "css-hot-loader",
                MiniCssExtractPlugin.loader,
                "css-modules-typescript-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64]",
                        },
                        localsConvention: "camelCaseOnly",
                    },
                },
                "sass-loader",
            ] ),
        } ],
    },

    plugins: compact( [
        new DotenvPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin( {
            hash: true,
            template: "./src/index.html",
            filename: "index.html",
        } ),
        new AutoDllPlugin( {
            inject: true,
            filename: "[name].js",
            entry: dllEntries,
            debug: true,
            inherit: ({
                context,
                devtool,
                mode,
            }) => ({
                context,
                target,
                devtool,
                mode,
            }),
        } ),
        isDev && new webpack.HotModuleReplacementPlugin(),
    ] ),

    devServer: isDev ? {
        contentBase: [
            resolve( rootDir, "static" ),
            resolve( rootDir, "dist" ),
        ],
        historyApiFallback: true,
        hot: true,
        stats: "minimal",
    } : undefined,

    devtool: isDev ? "source-map" : undefined,
});
