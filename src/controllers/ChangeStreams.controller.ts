import axios from "axios";
import { ObjectId } from "bson";
import mongoose from "mongoose";
import ChartDataModel from "../models/ChartData.model";
import AlertController from "./Alert.controller";

class ChangeStreams {
  public async monitorNewAlgoOutput() {
    console.log("monitoring...");
    let changeStream = ChartDataModel.watch();

    let cachedResumeToken: ObjectId;
    changeStream.on("change", (next) => {
      if (next.fullDocument.alertflags == 1) {
        //To-do what qualifies as an alert
        AlertController.postNewAlert(next.fullDocument);
      }
      cachedResumeToken = next["_id"];
    });

    changeStream.on("error", () => {
      if (cachedResumeToken) {
        changeStream = ChartDataModel.watch([], {
          resumeAfter: cachedResumeToken,
        });
      }
    });
  }
}

export default new ChangeStreams();
