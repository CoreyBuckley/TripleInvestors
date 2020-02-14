const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");
const webpack = require('webpack');
const commonConfig = require("./webpack.common");
const serveIndex = require("serve-index");
const defaultPort = 3000;
// the webpack.dev config has already been merged with the common since the config file has the merge call already in there
const compiler = process.env.NODE_ENV == 'development' ? webpack(require('./webpack.dev')) : webpack(require('./webpack.prod'));

// https://stackoverflow.com/questions/6294186/express-js-any-way-to-display-a-file-dir-listing
app.use("/", express.static(path.resolve(__dirname, "src")));
// app.use("/", serveIndex(path.resolve(__dirname, "src")));

app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: commonConfig.output.publicPath,
}));
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    reload: true
}));
app.use(express.json());
app.use(routes);

// https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.set("view engine", "ejs");

app.listen(process.env.PORT || defaultPort, "localhost", 4, () => {
    console.log(`${process.env.NODE_ENV == 'development' ? 'Development' : 'Production'} server running on port ${process.env.PORT || defaultPort}`);
});