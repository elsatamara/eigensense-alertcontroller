import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const userDB = process.env.mongoURI || "";

const connectDB = () => {
  try {
    mongoose.connect(userDB);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
