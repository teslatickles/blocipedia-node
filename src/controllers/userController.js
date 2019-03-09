const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {

    signUp(req, res, next) {
        res.render("users/sign_up");
    },

    create(req, res, next) {
        //#1
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            username: req.body.username
        };
        // #2
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {

                // #3
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully signed in!");
                    res.redirect("/");
                })
            }
        });
    }
}