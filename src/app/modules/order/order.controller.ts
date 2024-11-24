import { Request, Response } from 'express';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = await OrderService.createOrderDataIntoDB(req.body);
    res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: orderData,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
      stack: error.stack,
    });
  }
};

export const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderService.calculateTotalRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: revenue,
    });
  } catch (err: any) {
    res.status(400).json({
      message: 'Failed to calculate revenue',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

export const OrderController = {
  createOrder,
  getTotalRevenue,
};
