import { DataTypes, Sequelize } from "sequelize";
import { getDbConnection } from "../database";
import { CustomersFields } from "./Interface";

export function getCustomersModel() {
    return getDbConnection().define<CustomersFields>(
        "customers",
        {
            customer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.ENUM("1", "0"),
                defaultValue: "1",
            },
            created_at: {
                type: "TIMESTAMP",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: "TIMESTAMP",
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"),
            },
        },
        {
            freezeTableName: true,
            underscored: true,
        }
    );
}
