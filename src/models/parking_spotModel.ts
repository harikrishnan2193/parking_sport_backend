import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

interface ParkingSpotAttributes {
  spot_id: number;
  spot_name: string;
  location_id?: number | null;
  type_id?: number | null;
}

interface ParkingSpotCreationAttributes extends Optional<ParkingSpotAttributes, "spot_id"> {}
class ParkingSpot extends Model<ParkingSpotAttributes, ParkingSpotCreationAttributes> implements ParkingSpotAttributes {
  public spot_id!: number;
  public spot_name!: string;
  public location_id?: number | null;
  public type_id?: number | null;
}
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
    timestamps: false,
  }
);

export default ParkingSpot;
