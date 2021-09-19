import { Response, Request } from "express";
import { getAllLaunches, addNewLaunch, abortLaunch } from "../../models/launches.model";

export function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(getAllLaunches());
}
export function httpAddNewLaunch(req: Request, res: Response) {
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
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

export function httpAbortLaunch(req: Request, res: Response) {
  const launchId = Number(req.params.id);
  if (!launchId) {
    return res.status(400).json("No launchId specified");
  }
  const result = abortLaunch(launchId);
  if (!result) {
    return res.status(404).json("Launch not found for launchId: " + launchId);
  }
  return res.status(201).json(result);
}
