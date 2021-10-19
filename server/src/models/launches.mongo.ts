import mongoose from "mongoose";

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: { type: Date, required: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  destination: {
    type: String,
  },
  customers: [String],
  upcoming: { type: Boolean, required: true, default: true },
  success: { type: Boolean, required: true, default: true },
});


export const launchesDatabase = mongoose.model("Launch", launchesSchema);
export const launchesBackupdb = mongoose.model("LaunchBackup", launchesSchema);
