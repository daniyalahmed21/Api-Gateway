import Express from "express";

import flightRouter from "./flightRoutes.js";

const v1Router = Express.Router();

v1Router.use("/flights", flightRouter);

export default v1Router;
