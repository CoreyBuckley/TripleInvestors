// https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
// https://github.com/mysqljs/mysql#escaping-query-values
// https://stackoverflow.com/questions/26227639/how-can-i-pass-mysql-result-in-object-using-node-js

const router = require("express").Router();
const actions = require("./actions");
const state = require("./state");

const routes = {
    "login": [
        {
            method: "GET",
            actions: actions.get.loginPage
        },
        {
            method: "POST",
            actions: actions.post.loginPage
        }
    ],
    "download": [
        {
            method: "GET",
            actions: actions.get.download
        }
    ],
    "/": [
        {
            method: "GET",
            actions: actions.get.root
        }
    ],
    "confidential": [
        {
            method: "GET",
            actions: actions.get.confidentialPage,
            requiresAuthentication: true
        }
    ],
    "success": [
        {
            method: "GET",
            actions: actions.get.successPage,
            requiresAuthentication: true
        }
    ],
    "*": [
        {
            method: "GET",
            actions: actions.get.all
        }
    ]
}

// Traditional authentication scheme. Uses cookies and session ids.
// Middlewares: 1. Match a given request url with its corresponding route object and attach it to the request object,
//              2. Determine if the user is authorized to access the resource.
router.use(
    function (req, res, next) {
        let pathWithoutRoot = req.path.substr(1)
        if (routes[pathWithoutRoot]) {
            let matchingRoute = routes[pathWithoutRoot].filter(entry => entry.method == req.method);
            if (matchingRoute.length == 1) {
                // req.meta is tagged on info by the developer that gives additional information.
                // in this case, about the route
                req.meta = {};
                req.meta.route = matchingRoute[0];
            }
            else {
                console.log(`No matching route for ${req.method} ${req.path}`);
                return next("router");
            }
        }
        next();
    },
    function (req, res, next) {
        // console.log("Logged in users:");
        // console.log(state.loggedInUsers);
        // console.log(req.meta);
        if (req.meta && req.meta.route.requiresAuthentication) {
            if (req.cookies.session && state.loggedInUsers[req.cookies.session] !== undefined /*&& user.group == "developers"*/) {
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

for (let route in routes) {
    let httpMethodBindings = routes[route];
    let routePath = route;
    if (!route.startsWith('/') && !route.startsWith('*')) {
        routePath = '/'+route;
    }
    for (const binding of httpMethodBindings) {
        if (binding.method.toUpperCase() == 'GET') {
            router.get(routePath, binding.actions);
        }
        else if (binding.method.toUpperCase() == 'POST') {
            router.post(routePath, binding.actions);
        }
        else if (binding.method.toUpperCase() == 'UPDATE') {
            router.update(routePath, binding.actions);
        }
        else if (binding.method.toUpperCase() == 'DELETE') {
            router.delete(routePath, binding.actions);
        }
    }
}

module.exports = router;