import role from "../models/role.js";
import CrudRepository from "./crudRepository.js";

export default class RoleRepository extends CrudRepository {
  constructor() {
    super(role);
  }

  async getRoleByName(name) {
    const role = await this.model.findOne({ where: { name } });
    return role;
  }


}
