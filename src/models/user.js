import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";

export class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    // tableName: "Users",
  }
);

export default User;
