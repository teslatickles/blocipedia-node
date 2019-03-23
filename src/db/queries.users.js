const User = require("./models").User;
const bcrypt = require("bcryptjs");

module.exports = {
    // #2
    getUser(id, callback) {
        return User.findByPk(id)
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err);
            })
    },
    createUser(newUser, callback) {

        // #3
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        // #4
        return User.create({
            email: newUser.email,
            password: hashedPassword,
            username: newUser.username,
            role: 0
        })
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err);
            })
    },
    upgrade(id, callback) {
        return User.findByPk(id)
            .then((user) => {
                if (!user) {
                    return callback("User not found");
                }
                user.update({
                    role: 1
                })
                    .then(() => {
                        callback(null, user);
                        // console.log(user);
                    })
                    .catch((err) => {
                        callback(err);
                    })
            })
    },
    downgrade(id, callback) {
        return User.findByPk(id)
            .then((user) => {
                if (!user) {
                    return callback("User not found");
                }
                user.update({
                    role: 0
                })
                    .then(() => {
                        callback(null, user);
                    })
                    .catch((err) => {
                        callback(err);
                    })
            })
    }
}