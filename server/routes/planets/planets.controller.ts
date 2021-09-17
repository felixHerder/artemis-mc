import { planets } from '../../models/planets.model';

function getAllPlanets(req :any, res:any) {
  console.log('getAllPlanets called');
  
  return res.status(200).json(planets);
}

export default getAllPlanets;
