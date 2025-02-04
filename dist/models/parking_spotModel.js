"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class ParkingSpot extends sequelize_1.Model {
}
ParkingSpot.init({
    spot_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    spot_name: {
        type: sequelize_1.DataTypes.CHAR(255),
        allowNull: false,
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "parking_spots",
    timestamps: false,
});
exports.default = ParkingSpot;
