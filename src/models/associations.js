import User from "./user.js";
import Role from "./role.js";

// Many-to-Many
User.belongsToMany(Role, {
  through: "User_Roles", // matches join table name
  as: "roles",           // alias
  foreignKey: "userId",
});
Role.belongsToMany(User, {
  through: "User_Roles",
  as: "users",
  foreignKey: "roleId",
});

export { User, Role };
