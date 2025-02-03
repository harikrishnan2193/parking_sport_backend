import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

// Define attributes of the ParkingSpot model
interface ParkingSpotAttributes {
  spot_id: number;
  spot_name: string;
  location_id?: number | null;
  type_id?: number | null;
}

// Define optional attributes for creation (auto-increment fields should be optional)
interface ParkingSpotCreationAttributes extends Optional<ParkingSpotAttributes, "spot_id"> {}

// Extend Sequelize's Model class
class ParkingSpot extends Model<ParkingSpotAttributes, ParkingSpotCreationAttributes> implements ParkingSpotAttributes {
  public spot_id!: number;
  public spot_name!: string;
  public location_id?: number | null;
  public type_id?: number | null;
}

// Define the model
ParkingSpot.init(
  {
    spot_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    spot_name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "parking_spots",
    timestamps: false, // No createdAt or updatedAt columns
  }
);

export default ParkingSpot;
