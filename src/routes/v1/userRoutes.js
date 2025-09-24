import Express from "express";
import { UserController } from "../../controllers/index.js";
import Middlewares from "../../middlewares/index.js";

const userRouter = Express.Router();

// Signup route
userRouter.post(
  "/signup",
  Middlewares.validateAuthRequest, // validate email & password
  UserController.createUser
);

// Signin route
userRouter.post(
  "/signin",
  Middlewares.validateAuthRequest,
  UserController.signIn
);

// Add role to a user (Admin only)
userRouter.post(
  "/addRole",
  Middlewares.checkAuth,   // verifies JWT & sets req.user
  Middlewares.isAdmin,    // only allows admins
  UserController.addRoleToUser
);

export default userRouter;
