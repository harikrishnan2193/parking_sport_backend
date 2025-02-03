import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

// Define model attributes
interface ParkingRecordAttributes {
  id: number;
  vehicle_number: string;
  spot_id: number;
  type_id: number;
  person_name: string;
  location_id: number;
  parking_time: Date;
  checkout_time?: Date | null;
}

// Define optional attributes for creating a new record (e.g., `id` is auto-incremented)
interface ParkingRecordCreationAttributes extends Optional<ParkingRecordAttributes, "id" | "checkout_time"> {}

// Extend Sequelize's Model class
class ParkingRecord extends Model<ParkingRecordAttributes, ParkingRecordCreationAttributes> implements ParkingRecordAttributes {
  public id!: number;
  public vehicle_number!: string;
  public spot_id!: number;
  public type_id!: number;
  public person_name!: string;
  public location_id!: number;
  public parking_time!: Date;
  public checkout_time?: Date | null;
}

// Define the model
ParkingRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    vehicle_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    spot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    person_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parking_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    checkout_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "parking_records",
    timestamps: false, // No createdAt or updatedAt columns
  }
);

export default ParkingRecord;
