const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "production",
    devtool: "inline-source-map", // Comment this out if you wanna reduce bundle size
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
                        loader: "postcss-loader",
                        options: {
                            // https://github.com/postcss/postcss-loader#plugins
                            ident: "postcss",
                            plugins: [
                                require('autoprefixer')({
                                    grid: true
                                }),
                                require('cssnano'),
                            ]
                        }
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
        contentBase: path.resolve(__dirname, "./src/views/"),
        inline: false,
        hot: false,
        liveReload: false,
        watchContentBase: false
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    optimization: {
        minimize: true
    }
});