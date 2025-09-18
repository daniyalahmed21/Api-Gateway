import Express from "express";
import { UserController } from "../../controllers/index.js";
const userRouter = Express.Router();

userRouter.get("/", (req, res) => {
  res.send("User route is working");
});

userRouter.post("/", UserController.createUser);

export default userRouter;
