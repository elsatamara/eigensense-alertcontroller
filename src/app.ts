import express, { Request, Response } from "express";
import connectDB from "./config/db";
import ChangeStreams from "./controllers/ChangeStreams.controller";

connectDB();
ChangeStreams.monitorNewAlgoOutput();

const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

export default app;
