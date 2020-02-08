const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

// Default behavior of merge (on everything but loaders) is to replace the object with the 2nd argument object.
// merge.strategy allows for changing merge behavior: https://github.com/survivejs/webpack-merge#mergestrategy-field-prependappendreplaceconfiguration-configuration
module.exports = merge.strategy({entry: "append"})(common, {
    mode: "development",
    entry: {
        "home": [
            hotMiddlewareScript
        ],
        "login": [
            hotMiddlewareScript
        ]
    },
    module: {
        rules: [
            {
                test: /\.s(c|a)ss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true
                        }
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("sass")
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        // webpack-dev-server will create the project in memory (don't need a dist directory).
        // The contentBase pathes determine what webpack-dev-server should include as a potential resource
        // to serve.
        contentBase: [path.resolve(__dirname, "./src/views/"), path.resolve(__dirname, "./src")],
        // port: "9000", Using the webpack-dev-middleware with express, the express listen port will override this
        // inline: true,
        // hot: true,
        // liveReload: true,
        // watchContentBase: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});