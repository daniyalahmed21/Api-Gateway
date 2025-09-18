import Flight from "../models/flight.js";
import CrudRepository from "./crudRepository.js";
export default class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }
}
