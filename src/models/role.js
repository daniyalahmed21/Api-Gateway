import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.ENUM("admin", "customer", "flight-company"),
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    sequelize,
    modelName: "Role",
    // tableName: "Roles",
  }
);

export default Role;
