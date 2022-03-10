import { Schema, model } from "mongoose";
import { AlertInterface } from "../interfaces/Alert.interface";
import { AlertStatus } from "../utils/AlertStatus";

const alertSchema = new Schema<AlertInterface>({
  patternName: String,
  patternId: String,
  // chartDates: [Date],
  // chartPressures: [Number],
  preview: String,
  date: Date,
  location: String,
  regulator: String,
  status: String,
});

const AlertModel = model<AlertInterface>("alertdemos", alertSchema);

export default AlertModel;
