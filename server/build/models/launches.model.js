"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortLaunch = exports.existsLaunchWithId = exports.findLaunch = exports.getAllLaunches = exports.getLatestFLightNumber = exports.scheduleNewLaunch = exports.loadLaunchData = exports.resetLaunchData = exports.saveLaunchBackup = exports.saveLaunch = void 0;
const launches_mongo_1 = require("./launches.mongo");
const planets_mongo_1 = __importDefault(require("./planets.mongo"));
const axios_1 = __importDefault(require("axios"));
const DEFAULT_FLIGHT_NUMBER = 100;
function saveLaunch(launch) {
    return __awaiter(this, void 0, void 0, function* () {
        yield launches_mongo_1.launchesDatabase.findOneAndUpdate({
            flightNumber: launch.flightNumber,
        }, launch, { upsert: true });
    });
}
exports.saveLaunch = saveLaunch;
function saveLaunchBackup(launch) {
    return __awaiter(this, void 0, void 0, function* () {
        yield launches_mongo_1.launchesBackupdb.findOneAndUpdate({
            flightNumber: launch.flightNumber,
        }, launch, { upsert: true });
    });
}
exports.saveLaunchBackup = saveLaunchBackup;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
function populateLaunchesBackup() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Downloading launch data...");
        const response = yield axios_1.default.post(SPACEX_API_URL, {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: "rocket",
                        select: { name: 1 },
                    },
                    {
                        path: "payloads",
                        select: { customers: 1 },
                    },
                ],
            },
        });
        if (response.status !== 200) {
            console.log("problem downloading launch data");
            throw new Error("Launch data download failed");
        }
        const launchDocs = response.data.docs;
        for (const launchDoc of launchDocs) {
            const payloads = launchDoc["payloads"];
            const customers = payloads.flatMap((pl) => pl["customers"]);
            const launch = {
                flightNumber: launchDoc["flight_number"],
                mission: launchDoc["name"],
                rocket: launchDoc["rocket"]["name"],
                launchDate: launchDoc["date_local"],
                upcoming: launchDoc["upcoming"],
                success: launchDoc["success"],
                destination: "",
                customers,
            };
            console.log(launch.flightNumber, launch.mission);
            //populate launches collection
            yield saveLaunchBackup(launch);
        }
    });
}
function resetLaunchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const docs = yield launches_mongo_1.launchesBackupdb.find({});
        yield launches_mongo_1.launchesDatabase.deleteMany({});
        yield launches_mongo_1.launchesDatabase.insertMany(docs, { lean: true });
    });
}
exports.resetLaunchData = resetLaunchData;
function loadLaunchData() {
    return __awaiter(this, void 0, void 0, function* () {
        const firstLaunchBackup = yield launches_mongo_1.launchesBackupdb.findOne({
            flightNumber: 1,
            rocket: "Falcon 1",
            mission: "FalconSat",
        });
        if (firstLaunchBackup) {
            console.log("Launch api data allready loaded in backup");
        }
        else {
            yield populateLaunchesBackup();
        }
        const firstLaunch = yield launches_mongo_1.launchesDatabase.findOne({
            flightNumber: 1,
            rocket: "Falcon 1",
            mission: "FalconSat",
        });
        if (firstLaunch) {
            console.log("Launch data allready loaded from backup");
        }
        else {
            yield resetLaunchData();
        }
    });
}
exports.loadLaunchData = loadLaunchData;
function scheduleNewLaunch(launch) {
    return __awaiter(this, void 0, void 0, function* () {
        const planet = yield planets_mongo_1.default.findOne({
            keplerName: launch.destination,
        });
        if (!planet) {
            throw new Error("No matching planet was found");
        }
        const newFlightNumber = (yield getLatestFLightNumber()) + 1;
        const newLaunch = Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ["ESA", "NASA", "ISA"],
            flightNumber: newFlightNumber,
        });
        yield saveLaunch(newLaunch);
    });
}
exports.scheduleNewLaunch = scheduleNewLaunch;
function getLatestFLightNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        const latestLaunch = yield launches_mongo_1.launchesDatabase.findOne().sort("-flightNumber");
        if (!latestLaunch) {
            return DEFAULT_FLIGHT_NUMBER;
        }
        return latestLaunch.flightNumber;
    });
}
exports.getLatestFLightNumber = getLatestFLightNumber;
function getAllLaunches(limit, page, upcoming = false, sort = "flightNumber", order = "desc") {
    return __awaiter(this, void 0, void 0, function* () {
        return yield launches_mongo_1.launchesDatabase
            .find({ upcoming }, { _id: 0, __v: 0 })
            .sort({ [sort]: order })
            .skip(limit * page)
            .limit(limit);
    });
}
exports.getAllLaunches = getAllLaunches;
function findLaunch(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield launches_mongo_1.launchesDatabase.findOne(filter);
    });
}
exports.findLaunch = findLaunch;
function existsLaunchWithId(launchId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield findLaunch({ flightNumer: launchId });
    });
}
exports.existsLaunchWithId = existsLaunchWithId;
function abortLaunch(launchId) {
    return __awaiter(this, void 0, void 0, function* () {
        const aborted = yield launches_mongo_1.launchesDatabase.updateOne({ flightNumber: launchId }, { upcoming: false, success: false });
        return aborted.acknowledged && aborted.modifiedCount === 1;
    });
}
exports.abortLaunch = abortLaunch;
