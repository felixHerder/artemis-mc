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
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpResetLaunchData = exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = exports.httpGetAllRockets = void 0;
const launches_model_1 = require("../../models/launches.model");
const rockets_model_1 = require("../../models/rockets.model");
function httpGetAllRockets(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(200).json(yield (0, rockets_model_1.getAllRockets)());
    });
}
exports.httpGetAllRockets = httpGetAllRockets;
function httpGetAllLaunches(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = req.query.limit != undefined ? Number(req.query.limit) : 0;
        const page = req.query.page != undefined ? Number(req.query.page) : 0;
        const upcoming = req.query.upcoming === "true" ? true : false;
        const sort = req.query.sort != undefined ? String(req.query.sort) : "flightNumber";
        const order = req.query.order === "asc" ? "asc" : "desc";
        return res.status(200).json(yield (0, launches_model_1.getAllLaunches)(limit, page, upcoming, sort, order));
    });
}
exports.httpGetAllLaunches = httpGetAllLaunches;
function httpAddNewLaunch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const launch = req.body;
        if (!launch.mission || !launch.rocket || !launch.destination || !launch.launchDate) {
            return res.status(400).json({
                error: "Missing requiered launch data",
                data: launch,
            });
        }
        launch.launchDate = new Date(launch.launchDate);
        if (isNaN(launch.launchDate.getTime())) {
            return res.status(400).json({
                error: "Invalid launch date",
                data: launch,
            });
        }
        try {
            yield (0, launches_model_1.scheduleNewLaunch)(launch);
        }
        catch (error) {
            return res.status(400).json({ error: "Invalid Planet", destination: launch.destination });
            console.error("Error schduling launch", error);
        }
        return res.status(201).json(launch);
    });
}
exports.httpAddNewLaunch = httpAddNewLaunch;
function httpAbortLaunch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const launchId = Number(req.params.id);
        if (!launchId) {
            return res.status(400).json("No launchId specified");
        }
        const launchExists = yield (0, launches_model_1.existsLaunchWithId)(launchId);
        if (!launchExists) {
            return res.status(404).json("Launch not found for launchId: " + launchId);
        }
        const result = yield (0, launches_model_1.abortLaunch)(launchId);
        if (!result) {
            return res.status(400).json("Cannot abort launch " + launchId);
        }
        return res.status(201).json({ ok: true });
    });
}
exports.httpAbortLaunch = httpAbortLaunch;
function httpResetLaunchData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.query.resetdata === "true") {
            try {
                yield (0, launches_model_1.resetLaunchData)();
                res.status(201).json({ ok: true });
                console.log("Launch data reset");
            }
            catch (err) {
                console.error("Error resseting launch data:", err);
                res.status(400).json("Cannot reset launch data");
            }
        }
        else {
            res.status(400).json("Invalid");
        }
    });
}
exports.httpResetLaunchData = httpResetLaunchData;
