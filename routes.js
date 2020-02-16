const router = require("express").Router();
const path = require("path");

router.get("/download", function (req, res, next) {
    res.attachment(path.resolve(__dirname, "todo.md"));
    res.send();
    // res.sendFile(path.resolve(__dirname, "todo.md"));
});

router.get("/", function (req, res, next) {
    // res.sendFile(path.resolve("./src/views/index.html"));
    res.render(path.resolve("./src/views/index"), {
        data: [
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
        ]
    });
})

router.route("/login")
    .get(function (req, res, next) {
        res.sendFile(path.resolve("./src/views/login.html"));
        // res.render(path.resolve("./src/views/login"), {data: {}});
    })
    .post(function (req, res, next) {

    });

module.exports = router;