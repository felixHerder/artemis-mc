import { Response,Request } from 'express';
import { getAllRockets } from '../../models/rockets.model';

export async function httpGetAllRockets(req : Request, res: Response) {
  return res.status(200).json(await getAllRockets());
}