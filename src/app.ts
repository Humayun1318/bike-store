import express from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.routes';
const app = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', ProductRoutes)

export default app;
