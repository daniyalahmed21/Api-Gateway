import Express from "express";

import userRouter from "./userRoutes.js";

const v1Router = Express.Router();

v1Router.use("/users", userRouter);

export default v1Router;
