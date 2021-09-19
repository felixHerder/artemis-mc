import express  from 'express';
const cors = require('cors');
import path from 'path';
import expressStaticGzip from 'express-static-gzip';
import morgan from "morgan";

import planetsRouter from'./routes/planets/planets.router';
import launchesRouter from'./routes/launches/launches.router';
import { nextTick } from 'process';

const app  = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(morgan("short"))
app.use(express.json());

//emulate latency
app.use((req,res,next)=>{
  setTimeout(()=>next(),500)
})

const pathToClient = path.join(__dirname, '..', 'public')
app.use('/',expressStaticGzip(pathToClient,{}));
app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);

app.get('/*',(req,res)=>{
  res.sendFile(path.join(pathToClient,'index.html'));
})

export default app;