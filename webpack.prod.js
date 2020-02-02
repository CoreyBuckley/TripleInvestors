const merge = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "./src/views/"),
        port: "9300",
    },
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
    }
});