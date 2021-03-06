const path = require("path");
const crypto = require("crypto");
const mysql = require('mysql');
const sql = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

const bcrypt = require("bcrypt");

const state = require("./state");

module.exports = {
    get: {
        root: [
            function (_req, res, _next) {
                res.render(path.resolve("./src/views/index"), {
                    data: {
                        animate: true
                    }
                });
            }
        ],
        download: [
            function (_req, res, _next) {
                res.attachment(path.resolve(__dirname, "todo.md"));
                res.send();
            }
        ],
        loginPage: [
            function (_req, res, _next) {
                return res.render(path.resolve("./src/views/login"), {});
            }
        ],
        successPage: [
            function (_req, res, _next) {
                return res.render(path.resolve("./src/views/success"), {});
            }
        ],
        confidentialPage: [
            function (_req, res, _next) {
                return res.render(path.resolve("./src/views/confidential"), {});
            }
        ],
        all: [
            function (req, res, _next) {
                return res.send("Did not find " + req.path);
            }
        ]
    },
    post: {
        login: [
            function (req, res, next) {
                if (req.body.email) {
                    sql.query("SELECT password FROM users WHERE email = ?", [req.body.email], function (error, results, fields) {
                        if (error || results.length != 1) {
                            res.send("Failed");
                            throw error;
                        }
                        // https://www.npmjs.com/package/bcrypt#with-promises
                        bcrypt.compare(req.body.password, results[0].password).then(isMatch => {
                            if (isMatch) {
                                // res.cookie("username", "corey", { expires: new Date(Date.now() + 1000*60*5)});
                                let token = crypto.createHash('sha256')
                                            .update(req.ip + process.env.SESSION_SECRET + req.body.email + req.hostname + req.headers.date)
                                            .digest('hex');
                                // 1 minute
                                let expiresIn = 1000*60*1;
                                res.cookie("session", token, {
                                    expires: new Date(Date.now() + expiresIn)
                                });
                                state.loggedInUsers[token] = req.body.email;
                                // Set thread for deletion of logged in user from server state when cookie expires.
                                // Is this a use case for redis?
                                setTimeout(() => {
                                    delete state.loggedInUsers[token];
                                }, expiresIn);
                                return res.redirect(301, "/success");
                            }
                            else {
                                return res.end("Failed");
                            }
                        });
                    });
                }
            }
        ],
        signup: [
            function (req, res, next) {
                if (req.body.email && req.body.password) {
                    bcrypt.hash(req.body.password, 10).then(hashedPass => {
                        sql.query(`
                            SELECT 1 FROM users WHERE email=?;
                        `, [req.body.email], function(error, results, fields) {
                            if (error) {
                                throw error;
                            }
                            if (results.length > 0) {
                                return res.end("Already registered!");
                            }
                            else {
                                sql.query("INSERT INTO users (email, password) VALUES (?, ?);", [
                                    req.body.email,
                                    hashedPass
                                ], function (error, results, fields) {
                                    if (error) {
                                        throw error;
                                    }
                                    return res.end("Successfully signed up!");
                                })
                            }
                        })
                    });
                }
                else {
                    // Bad request
                    res.status(400)
                }
            }
        ]
    }
}