import { Schema, model } from "mongoose";
import { ChartData } from "../interfaces/ChartData.interface";

const chartDataSchema = new Schema<ChartData>({
  DateTime: Date,
  Pressure: Number,
  RegName: String,
  //   temperature: Number,
  //   logpressure: String,
  //   dayofweek: Number,
  //   julian: Number,
  //   hour: Number,
  //   julianhour: Number,
  //   prediction: Number,
  //   predictionlow: Number,
  //   predicitonhigh: Number,
  //   purpleflags: Number,
  //   purplerun: Number,
  //   collapsedpurpleflags: Number,
  //   yellowflags: Number,
  //   redflags: Number,
  // alertflags: Number,
  //   mostrecentupdate: Number,
  //   stderror: Number,
  //   dlerorr: Number,
});

const ChartDataModel = model<ChartData>("ChartDemo", chartDataSchema);

export default ChartDataModel;
