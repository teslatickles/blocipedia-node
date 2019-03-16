'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        User.hasMany(models.Wiki, {
            foreignKey: "id",
            as: "wikis"
        });
    };
    return User;
};