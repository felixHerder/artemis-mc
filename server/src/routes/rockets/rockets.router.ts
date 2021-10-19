import express from "express";
import { httpGetAllRockets } from "./rockets.controller";

const rocketsRouter = express.Router();
rocketsRouter.get('/',httpGetAllRockets);
export default rocketsRouter;