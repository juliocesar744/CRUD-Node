import express from 'express';
import { Application } from 'express';
import dotenv from 'dotenv';
import { routes } from './Routes';

const app: Application = express();

// body-parser
dotenv.config();

// routes
app.use('/', routes);

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});