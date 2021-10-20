"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rockets_controller_1 = require("./rockets.controller");
const rocketsRouter = express_1.default.Router();
rocketsRouter.get('/', rockets_controller_1.httpGetAllRockets);
exports.default = rocketsRouter;
