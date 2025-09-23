import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";


export class User_Role extends Model {}

User_Role.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User_Role",
    // tableName: "user_roles",
    timestamps: true, 
  }
);


export default User_Role;
