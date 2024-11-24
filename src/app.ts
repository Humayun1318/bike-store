import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.routes';
import { OrderRoutes } from './app/modules/order/order.route';
const app = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api', ProductRoutes);
app.use('/api', OrderRoutes);

//invalid URL catch
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    message: 'This is not valid URL!!',
    success: false,
  });
});

//error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).json({
      message: error.message,
      success: false,
      error: error,
      stack: error.stack,
    });
  }
});
export default app;
