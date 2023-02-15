import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8000;

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
  console.log("the server has started");
});
