'use strict';

let wikis = [];

wikis.push({
    title: "The origin of quotidian objects.",
    body: "Many items used in everday life come from various cultures throughout time.",
    userId: 0,
    private: false,
    createdAt: new Date(),
    updatedAt: new Date()
});

wikis.push({
    title: "Beatles' songs",
    body: "Beatles' songs that were recorded with novel engineering methods.",
    userId: 1,
    private: false,
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
        return queryInterface.bulkInsert("Wikis", wikis, {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('Person', null, {});
        */
        return queryInterface.bulkDelete("Wikis", null, {});
    }
};
