import Repositories from "../repositories/index.js";
import { checkPassword, createToken, verifyToken } from "../utils/auth.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/appError.js";

export default class UserService {
  constructor() {
    this.userRepository = new Repositories.UserRepository();
    this.roleRepository = new Repositories.RoleRepository();
  }

  // Create user and assign default 'customer' role
  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);
      const role = await this.roleRepository.getRoleByName("customer");
      if (!role) {
        throw new AppError("Role not found", StatusCodes.NOT_FOUND);
      }
      await user.addRole(role);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Sign in user and return JWT
  async signIn(data) {
    try {
      const { email, password } = data;
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }

      const isMatch = await checkPassword(password, user.password);
      if (!isMatch) {
        throw new AppError("Invalid credentials", StatusCodes.BAD_REQUEST);
      }

      const token = await createToken({ id: user.id, email: user.email });
      return { token };
    } catch (error) {
      throw error;
    }
  }

  // Verify JWT token and return user ID
  async isAuthenticated(token) {
    try {
      if (!token) {
        throw new AppError("Missing JWT token", StatusCodes.BAD_REQUEST);
      }

      const decoded = await verifyToken(token);
      const user = await this.userRepository.getById(decoded.id);
      if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }

      return user.id;
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new AppError("Invalid JWT token", StatusCodes.BAD_REQUEST);
      }
      if (error.name === "TokenExpiredError") {
        throw new AppError("JWT token expired", StatusCodes.BAD_REQUEST);
      }
      throw error;
    }
  }

  // Add a role to a user
  async addRoleToUser(userId, roleName) {
    try {
      const user = await this.userRepository.get(userId);
      if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }

      const role = await this.roleRepository.getRoleByName(roleName);
      if (!role) {
        throw new AppError("Role not found", StatusCodes.NOT_FOUND);
      }

      await user.addRole(role);
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Check if user has ADMIN role
  async isAdmin(userId) {
    try {
      const user = await this.userRepository.get(userId);
      if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
      }

      const adminRole = await this.roleRepository.getRoleByName("admin");
      if (!adminRole) {
        throw new AppError("Admin role not found", StatusCodes.NOT_FOUND);
      }

      return await user.hasRole(adminRole);
    } catch (error) {
      throw error;
    }
  }
}
