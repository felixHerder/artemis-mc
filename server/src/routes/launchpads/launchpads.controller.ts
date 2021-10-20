import { Response,Request } from 'express';
import { getAllLaunchpads } from '../../models/launchpads.model';

export async function httpGetAllLaunchpads(req : Request, res: Response) {
  return res.status(200).json(await getAllLaunchpads());
}