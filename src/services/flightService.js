import Repositories from "../repositories/index.js";

export default class FlightService {
  constructor() {
    this.flightRepository = new Repositories.FlightRepository();
  }
}
