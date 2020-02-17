// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// https://github.com/mysqljs/mysql#escaping-query-values
// https://stackoverflow.com/questions/26227639/how-can-i-pass-mysql-result-in-object-using-node-js

const router = require("express").Router();
const path = require("path");

var mysql = require('mysql');
var sql = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});

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
            animate: true
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
    sql.query("SELECT password FROM users WHERE email = ?", [req.body.email], function (error, results, fields) {
        if (error || results.length != 1) {
            res.send("Failed");
            throw error;
        }
        if (results[0].password == req.body.password) {
            return res.redirect(301, "/success");
        }
        else {
            return res.end("Failed");
        }
    });
});

router.get("/success", function (req, res, next) {
    return res.render(path.resolve("./src/views/success"), {});
});

// 404
router.get("*", function (req, res, next) {
    return res.send("Did not find " + req.path);
});

module.exports = router;