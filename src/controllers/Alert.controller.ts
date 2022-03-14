import AlertModel from "../models/Alert.model";
import ChartDataModel from "../models/ChartData.model";
import { AlertStatus } from "../utils/AlertStatus";
import BaseController from "./Base.controller";
import QuickChart from "quickchart-js";

class AlertController extends BaseController {
  public postNewAlert = async (newAlert: any) => {
    const currDate = newAlert.DateTime;
    const lastMonthDate = this.getLastMonthDate(newAlert.DateTime);
    console.log("After", currDate);
    console.log(lastMonthDate);
    const oneMonthData = await this.getOneMonthData(
      lastMonthDate,
      currDate,
      newAlert.RegName
    );

    const chartPreviewURL = this.generateChartPreview(oneMonthData);

    const newAlertData = new AlertModel({
      patternName: "",
      patternId: "",
      preview: chartPreviewURL,
      date: newAlert.DateTime,
      location: "",
      regulator: newAlert.RegName,
      status: AlertStatus.Pending,
    });
    await newAlertData.save();
  };

  private generateChartPreview = (datePressure: any) => {
    let chartPreview = new QuickChart();
    console.log("CHART", datePressure);
    chartPreview.setConfig({
      type: "line",
      data: {
        labels: datePressure.dates,
        datasets: [{ data: datePressure.pressures }],
      },
    });
    console.log(chartPreview.getUrl());
    return chartPreview.getUrl();
  };

  private getLastMonthDate = (newAlertDate: Date) => {
    let lastMonthDate = new Date(newAlertDate.getTime());
    lastMonthDate.setMonth(newAlertDate.getMonth() - 1);
    console.log("LAST MONTH", lastMonthDate);
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
