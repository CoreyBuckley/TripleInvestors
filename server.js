require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");
const morgan = require("morgan");
const webpack = require('webpack');
const commonConfig = require("./webpack.common");
const serveIndex = require("serve-index");
const defaultPort = 3000;
const isDev = process.env.NODE_ENV == 'development';
// the webpack.dev config has already been merged with the common since the config file has the merge call already in there
const compiler = isDev ? webpack(require('./webpack.dev')) : webpack(require('./webpack.prod'));

// https://stackoverflow.com/questions/6294186/express-js-any-way-to-display-a-file-dir-listing
app.use("/", express.static(path.resolve(__dirname, "src")));
// app.use("/", serveIndex(path.resolve(__dirname, "src")));

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: commonConfig.output.publicPath,
    // logLevel: "silent"
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    reload: true
}));
// For Content-Type: application/json
app.use(express.json());
// For Content-Type: application/x-www-form-urlencoded (form data POST)
app.use(express.urlencoded({
    extended: true
}))
app.use(morgan(isDev ? "dev" : "combined", {}));
app.use(routes);

// https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set("view engine", "ejs");

app.listen(process.env.PORT || defaultPort, "localhost", 4, () => {
    console.log(`${process.env.NODE_ENV == 'development' ? 'Development' : 'Production'} server running on port ${process.env.PORT || defaultPort}`);
});