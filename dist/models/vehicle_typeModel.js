"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
class VehicleType extends sequelize_1.Model {
}
VehicleType.init({
    type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type_name: {
        type: sequelize_1.DataTypes.CHAR(200),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "vehicle_type",
    timestamps: false,
});
exports.default = VehicleType;
