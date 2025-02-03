import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

// Define the attributes of the Rate model
interface RateAttributes {
  type_id: number;
  first_hour: number;
  additional_hour: number;
}

// Extend Sequelize's Model class
class Rate extends Model<RateAttributes> implements RateAttributes {
  public type_id!: number;
  public first_hour!: number;
  public additional_hour!: number;
}

// Define the model
Rate.init(
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    first_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    additional_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "rates",
    timestamps: false, // No createdAt or updatedAt columns
  }
);

export default Rate;
