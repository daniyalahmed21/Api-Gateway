import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.js";
import bcrypt from "bcryptjs";
import { SERVER_CONFIG } from "../config/serverConfig.js";
export class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.beforeCreate((user, options) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SERVER_CONFIG.SALT_ROUNDS);
  user.password = hashedPassword;
});


export default User;
