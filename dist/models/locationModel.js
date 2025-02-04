"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class Location extends sequelize_1.Model {
}
// define  model
Location.init({
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    location_name: {
        type: sequelize_1.DataTypes.CHAR(250),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "locations",
    timestamps: false,
});
exports.default = Location;
