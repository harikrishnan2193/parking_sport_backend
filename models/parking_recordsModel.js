const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ParkingRecord = sequelize.define('ParkingRecord', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    vehicle_number: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    spot_id: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    person_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parking_time: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    checkout_time: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'parking_records',
    timestamps: false 
});

module.exports = ParkingRecord;
