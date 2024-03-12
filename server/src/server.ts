import dotenv from "dotenv";
dotenv.config();
import http from "http";
import appToServe from "./app";
import mongoose from "mongoose";
import { loadPlanetsData } from "./models/planets.model";
import { loadLaunchData } from "./models/launches.model";
import { loadRocketData } from "./models/rockets.model";
import { loadLaunchpadData } from "./models/launchpads.model";

const PORT = process.env.PORT || 8000;
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DB_URL}/?retryWrites=true&w=majority&appName=Hyperion`;
console.log(mongoUrl);
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongooseDB:", err);
});

const server = http.createServer(appToServe);
async function startServer() {
  await mongoose.connect(mongoUrl);
  await loadPlanetsData();
  await loadLaunchData();
  await loadRocketData();
  await loadLaunchpadData();
  server.listen(PORT, () => console.log("listening on", PORT));
}

startServer();
