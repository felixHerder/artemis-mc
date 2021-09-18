import { Response,Request } from 'express';
import {launches} from '../../models/launches.model';

export function getAllLaunches(req : Request,res:Response){
  return res.status(200).json(Array.from(launches.values()));
}