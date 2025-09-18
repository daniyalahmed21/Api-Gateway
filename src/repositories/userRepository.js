import user from "../models/user.js";
import CrudRepository from "./crudRepository.js";

export default class UserRepository extends CrudRepository {
  constructor() {
    super(user);
  }
}
