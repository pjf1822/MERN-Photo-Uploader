import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import allRoutes from "./routes/index.js";

const app = express();
const PORT = 8000;

// middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", allRoutes);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "internal server error";

  return res.status(status).json({ message, stack: err.stack });
});
// db connect
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
// run express server
app.listen(process.env.PORT || PORT, () => {
  connectDB();
  console.log(`the server has started on port ${PORT}`);
});
