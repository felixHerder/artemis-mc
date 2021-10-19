import express from "express";
import { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch, httpResetLaunchData, httpGetAllRockets } from "./launches.controller";

const launchesRouter = express.Router();
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);
launchesRouter.delete("/", httpResetLaunchData);

export default launchesRouter;
