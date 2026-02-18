// import dotenv from "dotenv";
// dotenv.config();

console.log("ENV CHECK:", process.env.REDIS_URL); 

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

connectDB();

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
