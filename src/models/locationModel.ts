import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

// Define the attributes of the Location model
interface LocationAttributes {
    location_id: number;
    location_name: string;
}

// Define the creation attributes (optional location_id for new records)
interface LocationCreationAttributes extends Optional<LocationAttributes, "location_id"> { }

// Extend Sequelize's Model class
class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
    public location_id!: number;
    public location_name!: string;
}

// Define the model
Location.init(
    {
        location_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        location_name: {
            type: DataTypes.CHAR(250),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "locations",
        timestamps: false, // If you don't want createdAt & updatedAt columns
    }
);

export default Location;
