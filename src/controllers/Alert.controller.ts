import AlertModel from "../models/Alert.model";
import ChartDataModel from "../models/ChartData.model";
import { AlertStatus } from "../utils/AlertStatus";
import BaseController from "./Base.controller";
import QuickChart from "quickchart-js";
import mongoose from "mongoose";

class AlertController extends BaseController {
  public postNewAlert = async (newAlert: any) => {
    const currDate = newAlert.DateTime;
    const lastMonthDate = this.getLastMonthDate(newAlert.DateTime);
    const oneMonthData = await this.getOneMonthData(
      lastMonthDate,
      currDate,
      newAlert.RegName
    );

    const objectID = new mongoose.Types.ObjectId();
    console.log(objectID);
    // let patternId = objectID.toString().replace(/\D/g, "").slice(0, 5);
    let patternId = objectID.toString();
    console.log(patternId);

    const chartPreviewURL = this.generateChartPreview(oneMonthData);

    const newAlertData = new AlertModel({
      __id: objectID,
      patternName: "CA" + patternId.slice(0, 5),
      patternId: patternId,
      preview: chartPreviewURL,
      date: newAlert.DateTime,
      location: "CA" + patternId.slice(0, 5),
      regulator: newAlert.RegName,
      status: AlertStatus.Pending,
    });
    await newAlertData.save();
  };

  private generateChartPreview = (datePressure: any) => {
    let chartPreview = new QuickChart();
    console.log("CHART", datePressure);
    chartPreview
      .setConfig({
        type: "line",
        data: {
          labels: datePressure.dates,
          datasets: [
            {
              data: datePressure.pressures,
              fill: false,
              backgroundColor: "rgba(96,110,255,255)",
              borderWidth: 5,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            yAxes: [
              {
                gridLines: { color: "rgba(255, 255, 255, 255)" },
                display: false,
              },
            ],
            xAxes: [
              {
                gridLines: { color: "rgba(255, 255, 255, 255)" },
              },
            ],
          },
        },
      })
      .setBackgroundColor("rgba(227,235,247,255)");
    console.log(chartPreview.getUrl());
    return chartPreview.getUrl();
  };

  private getLastMonthDate = (newAlertDate: Date) => {
    let lastMonthDate = new Date(newAlertDate.getTime());
    lastMonthDate.setMonth(newAlertDate.getMonth() - 1);
    return lastMonthDate;
  };

  private getOneMonthData = async (
    lastMonthDate: Date,
    currDate: Date,
    regname: String
  ) => {
    const objectArray = await ChartDataModel.find({
      RegName: regname,
      alertFlag: 1,
      DateTime: {
        $gte: lastMonthDate.toJSON().slice(0, 10),
        $lte: currDate.toJSON().slice(0, 10),
      },
    });
    let dates: string[] = [];
    let pressures: Number[] = [];
    objectArray.forEach((elem) => {
      dates.push("");
      pressures.push(elem.Pressure);
    });
    let res = { dates: dates, pressures: pressures };
    // console.log(res);
    return res;
  };
}

export default new AlertController();
