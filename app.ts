import express, { Request, Response } from 'express';
import connectDB from './config/db';
import SensorDataModel from './models/SensorData.model';
import path from 'path';

connectDB();

const app = express();

app.use(express.json())

app.use(express.urlencoded({
    extended: true
  }))

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '/public/index.html'))})

app.post('/post-feedback', async (req, res) => {
    var regulatorName = req.body.name
    var location = req.body.location
    var date = req.body.date
    var charData = req.body.charData.split("")
    const newSensorData = new SensorDataModel({regulatorName: regulatorName, location: location, date: date, chartDatasets: charData})
    await newSensorData.save();
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

export default app;
