import http from 'http';
import appToServe from  './app';

import { loadPlanetsData } from '../models/planets.model';


const PORT = process.env.PORT || 8000;

const server = http.createServer(appToServe);

async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => console.log('listening on', PORT));
} 

startServer();

