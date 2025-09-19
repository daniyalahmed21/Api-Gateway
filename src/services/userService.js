import Repositories from "../repositories/index.js";
import { checkPassword, createToken } from "../utils/auth.js";
import AppError from "../utils/errors/appError.js";

export default class UserService {
  constructor() {
    this.userRepository = new Repositories.UserRepository();
  }
  async createUser(data) {
    try {
      const user = await this.userRepository.create(data);

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
      const token = await createToken({ id: user.id , email: user.email });

      return { token };
    } catch (error) {
      throw error;
    }
  }

 
}
