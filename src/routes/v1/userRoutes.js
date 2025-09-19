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

export default userRouter;
