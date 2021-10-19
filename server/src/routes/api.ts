import express from 'express';
import planetsRouter from'../routes/planets/planets.router';
import launchesRouter from'../routes/launches/launches.router';
import rocketsRouter from'../routes/rockets/rockets.router';

const api = express.Router();
 
api.use('/planets',planetsRouter);
api.use('/launches',launchesRouter);
api.use('/rockets',rocketsRouter);

export default api;