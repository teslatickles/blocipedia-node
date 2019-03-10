const wikiQueries = require("../db/queries.wiki.js");

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
    create(req, res, next) {

        let newWiki = {
            title: req.body.title,
            body: req.body.body,
            private: req.body.private
        };
        wikiQueries.addWiki(newWiki, (err, wiki) => {
            if (err) {
                res.redirect(500, "/wiki/new");
            } else {
                res.redirect(303, `/wiki`)
            }
        });
    }
}