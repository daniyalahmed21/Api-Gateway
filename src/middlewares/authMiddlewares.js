import { StatusCodes } from "http-status-codes";
import Services from "../services/index.js";

const ServicesInstance = new Services.UserService();

export const validateAuthRequest = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      data: {},
      message: "Invalid or missing email",
      error: { explanation: "Email is required and should be a string" },
    });
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "false",
      data: {},
      message: "Invalid or missing password",
      error: {
        explanation:
          "Password is required and should be at least 6 characters long",
      },
    });
  }

  next();
};

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers["x-access-token"];

  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      data: {},
      message: "Unauthorized",
      error: { explanation: "No token provided" },
    });
  }

  const token = ServicesInstance.isAuthenticated(authHeader);
  req.userId = token;
  next();
};
