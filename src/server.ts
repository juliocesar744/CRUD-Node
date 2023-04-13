import 'dotenv/config';

import express, { Application, Request, Response } from 'express';
import * as bodyParser from 'body-parser';

import defaultRoute from "./Routes/defaultRoute"
import userRoute from "./modules/Users/userController"
import { productRoute } from './modules/Products/productController'

const app: Application = express();
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/', defaultRoute);
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});