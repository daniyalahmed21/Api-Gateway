import Repositories from "../repositories/index.js";

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
}
