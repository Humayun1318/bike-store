import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Product } from './product.model';

export const validateSpecificProductId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    // Validate the ObjectId format
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        message: 'You provided an invalid ID format',
        success: false,
      });
    }

    // Use findOne() to check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({
        message: 'The specific bike was not found in the database.',
        success: false,
      });
    }
    res.locals.product = product;
    next();
  } catch (err) {
    next(err);
  }
};
