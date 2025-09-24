import { StatusCodes } from "http-status-codes";
import Services from "../services/index.js";
import { asyncHandler } from "../utils/errors/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";

const userService = new Services.UserService();

// Create a new user and assign default 'customer' role
export const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.createUser({ email, password });
  sendSuccess(res, user, "User created successfully", StatusCodes.CREATED);
});

// Sign in user and return JWT token
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.signIn({ email, password });
  sendSuccess(res, result, "User signed in successfully", StatusCodes.OK);
});

// Add a role to a user (Admin only)
export const addRoleToUser = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const result = await userService.addRoleToUser(userId, role);
  sendSuccess(res, result, "Role added to user successfully", StatusCodes.OK);
});
