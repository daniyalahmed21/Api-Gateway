import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SERVER_CONFIG } from "../config/serverConfig.js";

export async function checkPassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

export async function createToken(payload) {
  console.log("Creating token..." + SERVER_CONFIG.JWT_SECRET_KEY);
  try {
    const token = jwt.sign(payload, SERVER_CONFIG.JWT_SECRET_KEY, {
      expiresIn: SERVER_CONFIG.JWT_EXPIRES_IN || "1h",
    });
    return token;
  } catch (error) {
    throw error;
  }
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SERVER_CONFIG.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw error;
  }
}
