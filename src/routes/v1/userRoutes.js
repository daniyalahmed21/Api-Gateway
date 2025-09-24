import Express from "express";
import { UserController } from "../../controllers/index.js";
import Middlewares from "../../middlewares/index.js";
const userRouter = Express.Router();

userRouter.post(
  "/signup",
  Middlewares.validateAuthRequest,
  UserController.createUser
);
userRouter.post(
  "/signin",
  Middlewares.validateAuthRequest,
  UserController.signIn
);

// userRouter.post(
//   "/addRole",
//   UserController.addRoleToUser
// );

userRouter.post(
  "/addRole",
  Middlewares.checkAuth,   // verifies JWT & sets req.user
  Middlewares.isAdmin,    // only allows admins
  UserController.addRoleToUser
);

export default userRouter;
