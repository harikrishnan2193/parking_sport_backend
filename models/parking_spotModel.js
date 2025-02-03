const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
// const Location = require('./Location'); 

const ParkingSpot = sequelize.define('ParkingSpot', {
    spot_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    spot_name: {
        type: DataTypes.CHAR(255),
        allowNull: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'parking_spots',
    timestamps: false
});

module.exports = ParkingSpot;
