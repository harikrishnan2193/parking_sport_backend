const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
// const ParkingType = require('./ParkingType'); 

const Rate = sequelize.define('Rate', {
    type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    first_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    additional_hour: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'rates',
    timestamps: false
});

module.exports = Rate;
