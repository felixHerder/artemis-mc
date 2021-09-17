import express  from 'express';
const cors = require('cors');
import path from 'path';

import planetsRouter from'../routes/planets/planets.router';

const app  = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());

const pathToClient = path.join(__dirname, '..', '..', 'client','dist')
app.use(express.static(pathToClient));

app.use(planetsRouter);

app.get('/*', (req , res) => {
  res.sendFile(path.join(pathToClient,'index.html'));
})

export default app;