import { StatusCodes } from "http-status-codes";
import Services from "../services/index.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
const userService = new Services.UserService();

export const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser({ email, password });
  sendSuccess(res, user, "User created successfully", StatusCodes.CREATED);
});
