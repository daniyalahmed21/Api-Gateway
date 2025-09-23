import Repositories from "../repositories/index.js";
import { checkPassword, createToken, verifyToken } from "../utils/auth.js";
import AppError from "../utils/errors/appError.js";

export default class UserService {
  constructor() {
    this.userRepository = new Repositories.UserRepository();
    this.roleRepository = new Repositories.RoleRepository();
  }
  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);
      const role = await this.roleRepository.getRoleByName("customer");
      if (!role) {
        throw new AppError("Role not found");
      }
      await user.addRole(role);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(data) {
    try {
      const { email, password } = data;
      const user = await this.userRepository.getUserByEmail(email);
      if (!user) {
        throw new AppError("User not found");
      }
      const isMatch = await checkPassword(password, user.password);
      if (!isMatch) {
        throw new AppError("Invalid credentials");
      }
      const token = await createToken({ id: user.id, email: user.email });

      return { token };
    } catch (error) {
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const decoded = await verifyToken(token);
      const user = await this.userRepository.getById(decoded.id);
      if (!user) {
        throw new AppError("User not found");
      }
      return user.id;
    } catch (error) {
      throw error;
    }
  }
}
