const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Location = sequelize.define('Location', {
    location_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    location_name: {
        type: DataTypes.CHAR(250),
        allowNull: false
    }
}, {
    tableName: 'locations',
    timestamps: false
});

module.exports = Location;
