const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
    getAllWikis(callback) {
        return Wiki.findAll()
            .then((wikis) => {
                callback(null, wikis);
            })
            .catch((err) => {
                callback(err);
            })
    },
    addWiki(newWiki, callback) {
        return Wiki.create(newWiki)
            .then((wiki) => {
                callback(null, newWiki);
            })
            .catch((err) => {
                callback(err);
            })
    },
    getWiki(id, callback) {
        return Wiki.findByPk(id)
            .then((wiki) => {
                callback(null, wiki);
            })
            .catch((err) => {
                callback(err);
            })
    },
    deleteWiki(req, callback) {
        return Wiki.findByPk(req.params.id)
            .then((wiki) => {
                wiki.destroy()
                    .then((wiki) => {
                        callback(null, wiki);
                    })
                    .catch((err) => {
                        callback(err);
                    })
            });
    },
    updateWiki(req, updatedWiki, callback) {
        return Wiki.findByPk(req.params.id)
            .then((wiki) => {
                if (!wiki) {
                    return callback("Wiki not found");
                }
                wiki.update(updatedWiki, {
                    fields: Object.keys(updatedWiki)
                })
                    .then(() => {
                        callback(null, wiki);
                    })
                    .catch((err) => {
                        callback(err);
                    })
            })

    }
}