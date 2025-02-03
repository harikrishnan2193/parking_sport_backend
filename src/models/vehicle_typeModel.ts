import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

// Define the attributes of the VehicleType model
interface VehicleTypeAttributes {
  type_id: number;
  type_name: string;
}

// Define optional attributes for creation (auto-incremented fields should be optional)
interface VehicleTypeCreationAttributes extends Optional<VehicleTypeAttributes, "type_id"> {}

// Extend Sequelize's Model class
class VehicleType extends Model<VehicleTypeAttributes, VehicleTypeCreationAttributes> implements VehicleTypeAttributes {
  public type_id!: number;
  public type_name!: string;
}

// Define the model
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
    timestamps: false, // No createdAt or updatedAt columns
  }
);

export default VehicleType;
