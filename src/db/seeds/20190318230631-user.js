'use strict';

const bcrypt = require("bcryptjs");

let users = [];

let password1 = "hunterhartline";
const salt1 = bcrypt.genSaltSync();
const hashedPassword1 = bcrypt.hashSync(password1, salt1);

let password2 = "hunterhartline1";
const salt2 = bcrypt.genSaltSync();
const hashedPassword2 = bcrypt.hashSync(password2, salt2);

users.push({
    email: "hunterh@gamil.com",
    password: hashedPassword1,
    role: 0,
    username: "hunterh1",
    createdAt: new Date(),
    updatedAt: new Date()
});

users.push({
    email: "hartlineh@gamil.com",
    password: hashedPassword2,
    role: 0,
    username: "hartlineh",
    createdAt: new Date(),
    updatedAt: new Date()
});

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert("Users", users, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete("Users", null, {});
    }
};
