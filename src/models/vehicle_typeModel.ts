import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";
interface VehicleTypeAttributes {
  type_id: number;
  type_name: string;
}

interface VehicleTypeCreationAttributes extends Optional<VehicleTypeAttributes, "type_id"> {}
class VehicleType extends Model<VehicleTypeAttributes, VehicleTypeCreationAttributes> implements VehicleTypeAttributes {
  public type_id!: number;
  public type_name!: string;
}

VehicleType.init(
  {
    type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.CHAR(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "vehicle_type",
    timestamps: false, 
  }
);

export default VehicleType;
