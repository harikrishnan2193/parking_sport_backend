const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const VehicleType = sequelize.define('VehicleType', {
    type_id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type_name:{
        type: DataTypes.CHAR(200),
        allowNull: false
    }
}, {
    tableName: 'vehicle_type',
    timestamps: false
});

module.exports = VehicleType;
