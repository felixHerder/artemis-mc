"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchesBackupdb = exports.launchesDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const launchesSchema = new mongoose_1.default.Schema({
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
exports.launchesDatabase = mongoose_1.default.model("Launch", launchesSchema);
exports.launchesBackupdb = mongoose_1.default.model("LaunchBackup", launchesSchema);
