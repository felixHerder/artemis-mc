import { Response, Request } from "express";
import { getAllLaunches, scheduleNewLaunch, abortLaunch,existsLaunchWithId } from "../../models/launches.model";

export async function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(await getAllLaunches());
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
    return res.status(400).json({error:'Invalid Planet',destination:launch.destination});
    console.error('Error schduling launch',error)
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
  if(!result){
    return res.status(400).json("Cannot abort launch " + launchId);
  }
  return res.status(201).json({ok:true});
}
