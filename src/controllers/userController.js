const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');

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
        console.log(JSON.stringify(req.body.email));
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: JSON.stringify(req.body.email),
            from: 'hunterhartline@gmail.com',
            subject: 'You have created an account',
            text: `You're username is ${req.body.username} and password is ${req.body.password}`,
            html: '<strong>Thank you!</strong>',
        };
        sgMail.send(msg);
    },
    signInForm(req, res, next) {
        res.render("users/sign_in");
    },
    signIn(req, res, next) {
        passport.authenticate("local")(req, res, function () {
            if (!req.user) {
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },
    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    }
}