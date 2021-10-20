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
exports.loadRocketData = exports.getAllRockets = void 0;
const axios_1 = __importDefault(require("axios"));
const rockets_mongo_1 = require("./rockets.mongo");
function getAllRockets() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield rockets_mongo_1.rocketsCol.find({}, { _id: 0, __v: 0 });
    });
}
exports.getAllRockets = getAllRockets;
const SPACEX_API_URL_ROCKETS = "https://api.spacexdata.com/v4/rockets/";
function loadRocketData() {
    return __awaiter(this, void 0, void 0, function* () {
        //check mongodb for rocket data
        const fr = yield rockets_mongo_1.rocketsCol.findOne({ name: "Falcon 1" });
        if (fr) {
            console.log("Rockets data allready loaded");
        }
        else {
            //load data from spacex api
            const response = yield axios_1.default.get(SPACEX_API_URL_ROCKETS);
            if (response.status !== 200) {
                console.log("problem downloading rocket data");
                throw new Error("Rocket data download failed");
            }
            yield rockets_mongo_1.rocketsCol.deleteMany({});
            const rockets = response.data;
            rockets.forEach((rocket) => __awaiter(this, void 0, void 0, function* () {
                yield rockets_mongo_1.rocketsCol.create({
                    name: rocket.name,
                });
            }));
        }
    });
}
exports.loadRocketData = loadRocketData;
