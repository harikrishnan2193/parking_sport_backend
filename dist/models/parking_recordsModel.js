"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class ParkingRecord extends sequelize_1.Model {
}
// define model
ParkingRecord.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    vehicle_number: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    spot_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    person_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    parking_time: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    checkout_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "parking_records",
    timestamps: false,
});
exports.default = ParkingRecord;
