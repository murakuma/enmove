
import { resolve } from "path";

import webpack from "webpack";

import AutoDllPlugin from "autodll-webpack-plugin";
import DotenvPlugin from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const generate = ({
    rootDir,
    dllEntries,
    hot,
}: {
    rootDir: string,
    dllEntries: { [key: string]: ReadonlyArray<string> },
    hot?: boolean
}): webpack.Configuration => ({

    context: rootDir,
    entry: "./src/index.tsx",

    output: {
        filename: "bundle.js",
        path: resolve( rootDir, "dist" ),
        publicPath: "./",
    },

    resolve: {
        extensions: [ ".js", ".json", ".ts", ".tsx" ],
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
            use: [
                "css-hot-loader",
                MiniCssExtractPlugin.loader,
                "css-loader",
            ],
        }, {
            test: /\.(sa|sc)ss$/,
            use: [
                "css-hot-loader",
                MiniCssExtractPlugin.loader,
                {
                    loader: "typings-for-css-modules-loader",
                    options: {
                        // tslint:disable-next-line:max-line-length
                        banner: "// This file is automatically generated by typings-for-css-modules.\n// Please do not change this file!",
                        modules: true,
                        namedExport: true,
                        camelCase: true,
                        localIdentName: "[name]__[local]--[hash:base64:5]",
                    },
                },
                "sass-loader",
            ],
        } ],
    },

    plugins: [
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
        } ),
        ...( hot ? [
            new webpack.HotModuleReplacementPlugin(),
        ] : []),
    ],

    devServer: {
        contentBase: [
            resolve( rootDir, "static" ),
            resolve( rootDir, "dist" ),
        ],
        historyApiFallback: true,
        hot,
        stats: "minimal",
    },

    devtool: "source-map",
});
