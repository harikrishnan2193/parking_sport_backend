import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db/connection";

// define the attributes
interface LocationAttributes {
    location_id: number;
    location_name: string;
}

interface LocationCreationAttributes extends Optional<LocationAttributes, "location_id"> { }

class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
    public location_id!: number;
    public location_name!: string;
}

// define  model
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
        timestamps: false, 
    }
);

export default Location;
