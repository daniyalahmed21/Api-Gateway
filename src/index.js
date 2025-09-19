import Express from "express";
import { SERVER_CONFIG } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
import Middlewares from "./middlewares/index.js";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 20,
  message: "Too many requests from this IP, please try again after a while",
});

const app = Express();

app.use(limiter);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use(Middlewares.errorHandler);

app.listen(SERVER_CONFIG.PORT, async () => {
  console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
});
