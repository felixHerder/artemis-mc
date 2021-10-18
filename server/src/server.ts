import http from "http";
import appToServe from "./app";
import mongoose, { ConnectOptions } from "mongoose";

import { loadPlanetsData } from "./models/planets.model";

const PORT = process.env.PORT || 8000;
const MONGO_URL = "***REMOVED***?retryWrites=true&w=majority";

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
  server.listen(PORT, () => console.log("listening on", PORT));
}

startServer();
