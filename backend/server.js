import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", allRoutes);
const connectDB = async () => {
  try {
    await mongoose
      .set("strictQuery", true)
      .connect(process.env.DB_CONNECTION_STRING);

    console.log("database connecteddd");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.listen(PORT, () => {
  connectDB();
  console.log(`the server has started on port ${PORT}`);
});
