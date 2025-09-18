import { Sequelize } from "sequelize";
import Airplane from "../models/airplane.js";
import Airport from "../models/airport.js";
import Flight from "../models/flight.js";
import CrudRepository from "./crudRepository.js";
import { addRowLockOnFlights } from "./queries.js";
import db from "../models/index.js";
export default class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, order = []) {
    console.log("Filter in repository:", filter);
    console.log("Order in repository:", order);
    return await Flight.findAll({
      where: filter,
      order: order,
      include: [
        {
          model: Airport,
          as: "departureAirport",
          on: Sequelize.where(
            Sequelize.col("departureAirport.code"),
            "=",
            Sequelize.col("Flight.departureAirportId")
          ),
        },
        {
          model: Airport,
          as: "arrivalAirport",
          on: Sequelize.where(
            Sequelize.col("arrivalAirport.code"),
            "=",
            Sequelize.col("Flight.arrivalAirportId")
          ),
        },
        {
          model: Airplane,
          as: "airplane",
        },
      ],
    });
  }

  async updateSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();
    try {
      // Optional: row-level lock to avoid race conditions
      await db.sequelize.query(addRowLockOnFlights(flightId), { transaction });
  
      const flight = await Flight.findByPk(flightId, { transaction, lock: true });
      if (!flight) {
        throw new Error("Flight not found");
      }
  
      if (dec) {
        await flight.decrement("totalSeats", { by: seats, transaction });
      } else {
        await flight.increment("totalSeats", { by: seats, transaction });
      }
  
      await transaction.commit();
  
      // Reload to get updated value
      await flight.reload();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
}
