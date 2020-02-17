// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// https://github.com/mysqljs/mysql#escaping-query-values
// https://stackoverflow.com/questions/26227639/how-can-i-pass-mysql-result-in-object-using-node-js

const router = require("express").Router();
const path = require("path");
const crypto = require("crypto");

var mysql = require('mysql');
var sql = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

var logged_in_users = {};

// Need to add authentication middleware
// (Check cookie)
router.use(function (req, res, next) {
    if (requiresAuth(req.path)) {
        if (req.cookies.session && logged_in_users[req.cookies.session] !== undefined) {
            next()
        }
        else {
            return res.redirect("/login");
        }
    }
    else {
        next();
        // next("router");
        // or return res.render("NotAuthorized");
        // return next("router");
        // return res.redirect("/login");
    }
    // console.log("COOKIES");
    // console.log(req.headers.cookie);
    // console.log(req.cookies);
    // console.log("Logged in users:");
    // console.log(logged_in_users);
    // next();
});

function requiresAuth(path) {
    if (path == "/confidential") {
        return true;
    }
    return false;
}

router.get("/download", function (req, res, next) {
    res.attachment(path.resolve(__dirname, "todo.md"));
    res.send();
    // res.sendFile(path.resolve(__dirname, "todo.md"));
});

router.get("/", function (req, res, next) {
    // res.sendFile(path.resolve("./src/views/index.html"));
    res.render(path.resolve("./src/views/index"), {
        // data: [
            // "adam",
            // "suzy",
            // "tommy",
            // "becky",
            // "timmy",
            // "mary",
            // "billy",
            // "jill",
            // "tom",
            // "berta",
            // "amanda",
            // "tony",
            // "jack",
            // "tabitha"
        // ]
        data: {
            animate: true,
            // user: {
            //     username: "corey"
            // }
        }
    });
})

router.route("/login")
.get(function (req, res, next) {
    // res.sendFile(path.resolve("./src/views/login.html"));
    return res.render(path.resolve("./src/views/login"), {});
    // res.render(path.resolve("./src/views/login"), {data: {}});
})
.post(function (req, res, next) {
    // results gives back an array of row objects
    if (req.body.email) {
        sql.query("SELECT password FROM users WHERE email = ?", [req.body.email], function (error, results, fields) {
            if (error || results.length != 1) {
                res.send("Failed");
                throw error;
            }
            if (results[0].password == req.body.password) {
                // res.cookie("username", "corey", { expires: new Date(Date.now() + 1000*60*5)});
                let token = crypto.createHash('sha256')
                                  .update(req.ip + process.env.SESSION_SECRET + req.body.email + req.hostname + req.headers.date)
                                  .digest('hex');
                res.cookie("session", token, {
                    expires: new Date(Date.now() + 1000*60*5)
                });
                // TODO How to automatically delete logged in user from this map when cookie expires?
                logged_in_users[token] = req.body.email;
                return res.redirect(301, "/success");
            }
            else {
                return res.end("Failed");
            }
        });
    }
});

router.get("/success", function (req, res, next) {
    return res.render(path.resolve("./src/views/success"), {});
});

router.get("/confidential", (req, res, next) => {
    return res.render(path.resolve("./src/views/confidential"), {});
})

// 404
router.get("*", function (req, res, next) {
    return res.send("Did not find " + req.path);
});

module.exports = router;