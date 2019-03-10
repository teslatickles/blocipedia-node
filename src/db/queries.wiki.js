const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
    getAllWikis(callback) {
        return Wiki.all()
            // {
            //     include: [
            //         {
            //             model: Wiki,
            //             as: "wikis"
            //         }
            //     ]
            // })
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
                callback(null, post);
            })
            .catch((err) => {
                callback(err);
            })
    },
}