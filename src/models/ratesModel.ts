import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
interface RateAttributes {
  type_id: number;
  first_hour: number;
  additional_hour: number;
}
class Rate extends Model<RateAttributes> implements RateAttributes {
  public type_id!: number;
  public first_hour!: number;
  public additional_hour!: number;
}

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
    timestamps: false,
  }
);

export default Rate;
