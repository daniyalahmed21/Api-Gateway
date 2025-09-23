import dotenv from "dotenv";
dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,

  DB: {
    NAME: process.env.DB_NAME || "Flights",
    USER: process.env.DB_USER || "root",
    PASS: process.env.DB_PASS || "",
    HOST: process.env.DB_HOST || "localhost",
    DIALECT: process.env.DB_DIALECT || "mysql",
  },
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "your_jwt_secret_key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  FLIGHT_SERVICE: process.env.FlightService_URL || "http://localhost:3000/",
  BOOKING_SERVICE: process.env.BookingService_URL || "http://localhost:4000/",
};
