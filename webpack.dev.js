const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.s(c|a)ss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
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
        // to serve. So, the first path allows the server to find the index.html file (and all others),
        // /src is for including the assets folder so existing paths don't break. E.g. /assets/img.jpg.
        // The server also executes webpack build process so the minified javascript and css files will
        // be generated in the content base as well. E.g.
        //
        // +-webpack-dev-server
        // |
        // |__+ home.min.js
        // |__+ home.css
        // |__+ login.css
        // |__+ index.html
        // |__+ login.html
        // |__+ assets
        //    |__+ workspace.jpg
        // |
        // |__+ scripts
        //    |__+ home.js
        //    |__+ polyfills.js
        // |__+ styles
        //    |__+ global.scss
        //    |__+ home.scss
        //    |__+ login.scss
        //    |__+ main.scss
        // |__+ views
        //    |__+ index.html
        //    |__+ login.html
        contentBase: [path.resolve(__dirname, "./src/views/"), path.resolve(__dirname, "./src")],
        // port: "9000", Using the webpack-dev-middleware with express, the express listen port will override this
        // inline: true,
        // hot: true,
        // liveReload: true,
        // watchContentBase: true
    }
});