import { planets } from '../../models/planets.model';

export function getAllPlanets(req :any, res:any) {
  return res.status(200).json(planets);
}


