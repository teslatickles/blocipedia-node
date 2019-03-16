'use strict';
module.exports = (sequelize, DataTypes) => {
    var Wiki = sequelize.define('Wiki', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        private: DataTypes.BOOLEAN
    }, {});
    Wiki.associate = function (models) {
        // associations can be defined here
        Wiki.belongsTo(models.User, {
            foreignKey: "id",
            onDelete: "CASCADE"
        });
    };
    return Wiki;
};