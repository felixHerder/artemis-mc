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
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const planets_model_1 = require("./models/planets.model");
const launches_model_1 = require("./models/launches.model");
const rockets_model_1 = require("./models/rockets.model");
const PORT = process.env.PORT || 8000;
const MONGO_URL = "***REMOVED***?retryWrites=true&w=majority";
mongoose_1.default.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error("Error connecting to MongooseDB:", err);
});
const server = http_1.default.createServer(app_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(MONGO_URL);
        yield (0, planets_model_1.loadPlanetsData)();
        yield (0, launches_model_1.loadLaunchData)();
        yield (0, rockets_model_1.loadRocketData)();
        server.listen(PORT, () => console.log("listening on", PORT));
    });
}
startServer();
