const wikiQueries = require("../db/queries.wiki.js");
const Authorizer = require("../policies/application");

module.exports = {
    index(req, res, next) {
        wikiQueries.getAllWikis((err, wikis) => {
            if (err) {
                res.redirect(500, "static/index")
            } else {
                res.render("wikis/wiki", { wikis });
            }
        })
    },
    new(req, res, next) {
        const authorized = new Authorizer(req.user).new();

        if (authorized) {
            res.render('wikis/new');
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect("/wiki");
        }
    },
    create(req, res, next) {
        let newWiki = {
            title: req.body.title,
            body: req.body.body,
            private: false,
            userId: req.user.id
        };
        console.log(newWiki);
        wikiQueries.addWiki(newWiki, (err, wiki) => {
            console.log(wiki);
            if (err) {
                console.log(err);
                res.redirect(500, "/wikis/new");
            } else {
                res.redirect(303, `/wiki`);
            }
        });
    },
    show(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki === null) {
                res.redirect(404, `/`);
            } else {
                res.render("wikis/show", { wiki });
            }
        });
    },
    destroy(req, res, next) {
        wikiQueries.deleteWiki(req, (err, wiki) => {
            if (err) {
                res.redirect(err, `/wikis/${req.params.id}`);
            } else {
                res.redirect(303, "/wiki");
            }
        })
    },
    edit(req, res, next) {
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if (err || wiki === null) {
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, wiki).edit();
                console.log(req.user);
                console.log(wiki.userId);
                if (authorized) {
                    res.render("wikis/edit", { wiki });
                } else {
                    req.flash("You are not authorized to do that.");
                    res.redirect(`/wiki`);
                }
            }
        });
    },
    update(req, res, next) {
        wikiQueries.updateWiki(req, req.body, (err, wiki) => {
            if (err || wiki === null) {
                res.redirect(401, `/wikis/${req.params.id}/edit`);
            } else {
                res.redirect(`/wikis/${req.params.id}`);
            }
        });
    }
}