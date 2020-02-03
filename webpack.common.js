// S/CSS parts help from https://dev.to/pixelgoo/how-to-configure-webpack-from-scratch-for-a-basic-website-46a5
// https://webpack.js.org/plugins/mini-css-extract-plugin/#module-filename-option
// https://webpack.js.org/plugins/mini-css-extract-plugin/#hot-module-reloading-hmr
// https://stackoverflow.com/questions/42813050/webpack-multiple-entry-points-sass-and-js
// https://stackoverflow.com/questions/40565361/what-does-resolve-extensions-do-in-webpack
// https://ss64.com/nt/move.html
// https://webpack.js.org/guides/production/#setup
// https://webpack.js.org/configuration/devtool/#root
// https://stackoverflow.com/questions/55901104/webpack-compile-is-very-slow
// https://github.com/webpack-contrib/webpack-hot-middleware
// https://stackoverflow.com/questions/35233291/running-a-node-express-server-using-webpack-dev-server
// https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder

const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        "home": [
            path.resolve(__dirname, "src/scripts/home.js"),
            path.resolve(__dirname, "src/styles/home.scss"),
            hotMiddlewareScript
        ],
        "login": [
            path.resolve(__dirname, "src/styles/login.scss"),
            hotMiddlewareScript
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".ts", ".jsx", ".scss", ".css", ".sass"]
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: "babel-loader?cacheDirectory",
                exclude: path.resolve(__dirname, "node_modules"),
            },
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        compress: true
        // noInfo: true,
        // stats: 'minimal',
    }
}