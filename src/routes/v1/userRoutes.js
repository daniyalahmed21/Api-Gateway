import Express from "express";
import { UserController } from "../../controllers/index.js";
const userRouter = Express.Router();

userRouter.post("/signup", UserController.createUser);
userRouter.post("/signin", UserController.signIn);

export default userRouter;
