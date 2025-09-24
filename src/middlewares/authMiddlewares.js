import { StatusCodes } from 'http-status-codes';
import Services from '../services/index.js';
import { sendError } from '../utils/responseHandler.js';

const ServicesInstance = new Services.UserService();

export const validateAuthRequest = (req, res, next) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return sendError(res, 'Invalid or missing email', ['Email is required and should be a valid email address'], StatusCodes.BAD_REQUEST);
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return sendError(res, 'Invalid or missing password', ['Password is required and should be at least 6 characters long'], StatusCodes.BAD_REQUEST);
  }

  next();
};

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers['x-access-token'];

  if (!authHeader) {
    return sendError(res, 'Unauthorized', ['No token provided'], StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const userId = ServicesInstance.isAuthenticated(token);
    req.userId = userId;
    next();
  } catch (error) {
    return sendError(res, 'Unauthorized', [error.message], StatusCodes.UNAUTHORIZED);
  }
};

export async function isAdmin(req, res, next) {
  try {
    const user = await ServicesInstance.getUserById(req.userId);
    if (!user) {
      return sendError(res, 'User not found', ['No user found for the provided token'], StatusCodes.NOT_FOUND);
    }

    const isAdmin = await ServicesInstance.isAdmin(user.id);
    if (!isAdmin) {
      return sendError(res, 'Forbidden', ['User is not an admin'], StatusCodes.FORBIDDEN);
    }

    next();
  } catch (error) {
    return sendError(res, 'Unauthorized', [error.message], StatusCodes.UNAUTHORIZED);
  }
}