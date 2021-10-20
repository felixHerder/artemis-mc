import express from "express";
import { httpGetAllLaunchpads } from "./launchpads.controller";

const launchpadsRouter = express.Router();
launchpadsRouter.get('/',httpGetAllLaunchpads);
export default launchpadsRouter;