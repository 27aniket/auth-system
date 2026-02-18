import jwt from "jsonwebtoken";

export const signAccess = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20m" });

export const signRefresh = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "14d" });
