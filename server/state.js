// Modules are cached. Future requires to this will return the same object as the one other modules have.
// I.e. this object is shared between those that require it.
// https://stackoverflow.com/questions/24835476/what-is-the-better-practice-for-sharing-variables-across-node-js-modules

var state = {
    loggedInUsers: {}
}

module.exports = state;