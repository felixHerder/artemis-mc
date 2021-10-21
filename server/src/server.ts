import dotenv from 'dotenv';
dotenv.config();
import http from "http";
import appToServe from "./app";
import mongoose from "mongoose";
import { loadPlanetsData } from "./models/planets.model";
import {loadLaunchData} from './models/launches.model';
import { loadRocketData } from "./models/rockets.model";
import { loadLaunchpadData } from "./models/launchpads.model";

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL as string;
console.log(process.env.MONGO_URL);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongooseDB:", err);
});

const server = http.createServer(appToServe);
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  await loadLaunchData();
  await loadRocketData();
  await loadLaunchpadData();
  server.listen(PORT, () => console.log("listening on", PORT));
}

startServer();
