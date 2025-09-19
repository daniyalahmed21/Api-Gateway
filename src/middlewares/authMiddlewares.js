import { StatusCodes } from "http-status-codes";

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
        explanation: "Password is required and should be at least 6 characters long",
      },
    });
  }

  next();
};
