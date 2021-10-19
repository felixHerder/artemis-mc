import { Response, Request } from "express";
import { getAllLaunches, scheduleNewLaunch, abortLaunch, existsLaunchWithId, resetLaunchData } from "../../models/launches.model";
import {getAllRockets} from '../../models/rockets.model';

export async function httpGetAllRockets(req: Request, res: Response) {
  return res.status(200).json(await getAllRockets());
}
export async function httpGetAllLaunches(req: Request, res: Response) {
  const limit = req.query.limit != undefined ? Number(req.query.limit) : 0;
  const page = req.query.page != undefined ? Number(req.query.page) : 0;
  const upcoming = req.query.upcoming === "true" ? true : false;
  const sort = req.query.sort != undefined ? String(req.query.sort) : "flightNumber";
  const order = req.query.order === "asc" ? "asc" : "desc";
  return res.status(200).json(await getAllLaunches(limit, page, upcoming, sort, order));
}
export async function httpAddNewLaunch(req: Request, res: Response) {
  const launch: LaunchData = req.body;

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
    await scheduleNewLaunch(launch);
  } catch (error) {
    return res.status(400).json({ error: "Invalid Planet", destination: launch.destination });
    console.error("Error schduling launch", error);
  }
  return res.status(201).json(launch);
}

export async function httpAbortLaunch(req: Request, res: Response) {
  const launchId = Number(req.params.id);
  if (!launchId) {
    return res.status(400).json("No launchId specified");
  }
  const launchExists = await existsLaunchWithId(launchId);
  if (!launchExists) {
    return res.status(404).json("Launch not found for launchId: " + launchId);
  }

  const result = await abortLaunch(launchId);
  if (!result) {
    return res.status(400).json("Cannot abort launch " + launchId);
  }
  return res.status(201).json({ ok: true });
}

export async function httpResetLaunchData(req: Request, res: Response) {
  if (req.query.resetdata === "true") {
    try {
      await resetLaunchData();
      res.status(201).json({ ok: true });
      console.log("Launch data reset");
    } catch (err) {
      console.error("Error resseting launch data:", err);
      res.status(400).json("Cannot reset launch data");
    }
  } else {
    res.status(400).json("Invalid");
  }
}
