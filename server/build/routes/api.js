"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const planets_router_1 = __importDefault(require("../routes/planets/planets.router"));
const launches_router_1 = __importDefault(require("../routes/launches/launches.router"));
const rockets_router_1 = __importDefault(require("../routes/rockets/rockets.router"));
const api = express_1.default.Router();
api.use('/planets', planets_router_1.default);
api.use('/launches', launches_router_1.default);
api.use('/rockets', rockets_router_1.default);
exports.default = api;
