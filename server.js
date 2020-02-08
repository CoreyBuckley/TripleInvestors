const path = require("path");
const express = require("express");
const app = express();
const webpack = require('webpack');
const commonConfig = require("./webpack.common");
const serveIndex = require("serve-index");
const defaultPort = 3000;
// const webpackMerge = require('webpack-merge');
// const x = require('./webpack.common');
// const y = require('./webpack.dev');
// const z = require('./webpack.prod');
// console.log("WEBPACK.DEV");
// console.log(y);
// console.log("WEBPACK.PROD");
// console.log(z);
// console.log(x);
// console.log("*******************");
// console.log(y); // the webpack.dev config has already been merged with the common? I guess because the config file has the merge call already in there?
// console.log("-------------------");
// const devConfig = webpackMerge(x, y);
// const prodConfig = webpackMerge(require('./webpack.common'), require('./webpack.prod'));
// console.log(devConfig);
const compiler = process.env.NODE_ENV == 'development' ? webpack(require('./webpack.dev')) : webpack(require('./webpack.prod')); //move your `devServer` config from `webpack.config.js`

// https://stackoverflow.com/questions/6294186/express-js-any-way-to-display-a-file-dir-listing
app.use("/", express.static(path.resolve(__dirname, "src")));
app.use("/", serveIndex(path.resolve(__dirname, "src")));

app.use(require('webpack-dev-middleware')(compiler, {
    // serverSideRender: true,
    publicPath: commonConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
}));
app.use(express.json());

app.get("/download", function (req, res, next) {
    res.attachment(path.resolve(__dirname, "todo.md"));
    res.send();
    // res.sendFile(path.resolve(__dirname, "todo.md"));
});

// app.get("/", function (req, res, next) {
//     res.sendFile(path.resolve("./src/views/index.html"));
// })

app.listen(process.env.PORT || defaultPort, "localhost", 4, () => {
    console.log(`Server started on ${process.env.PORT || defaultPort}`);
});