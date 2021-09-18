import { Response,Request } from 'express';
import { planets } from '../../models/planets.model';

export function getAllPlanets(req : Request, res: Response) {
  return res.status(200).json(planets);
}


