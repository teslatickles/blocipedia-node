// const userQueries = require("../db/queries.users");
// const passport = require("passport");

module.exports = {
    signUp(req, res, next) {
        res.render("users/sign_up");
    }
}