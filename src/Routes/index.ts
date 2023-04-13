import express from 'express';
import { defaultRoute } from './defaultRoute';
import { userRoute } from '../modules/Users/userController'
import { productRoute } from '../modules/Products/productController'

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(userRoute);
routes.use(productRoute);