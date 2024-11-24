import { NextFunction, Request, Response } from 'express';
import { ProductService } from './product.service';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const validateData = ProductValidationSchema.parse(req.body)
    const productData = await ProductService.createProductDataIntoDB(req.body);
    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: productData,
    });
  } catch (err: any) {
    next(err);
  }
};

const getAllBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryKeys = Object.keys(req.query);
    // Check for invalid query parameters
    if (
      queryKeys.length > 1 ||
      (queryKeys.length === 1 &&
        (queryKeys[0] !== 'searchTerm' || !req.query.searchTerm))
    ) {
      res.status(404).json({
        message:
          "Invalid query parameter(s). Only 'searchTerm' is allowed. with the 'key=value' format",
        success: false,
      });
    }
    const searchTerm = req.query.searchTerm || null;
    const bikesData = await ProductService.getAllBikesFromDB(searchTerm);
    // Handle no matching documents case
    if (bikesData.length === 0) {
      res.status(404).json({
        message: 'No matching data found in the database',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: bikesData,
    });
  } catch (err: any) {
    next(err);
  }
};

const getSingleBike = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const specifiedBikeData = res.locals.product;
    res.status(200).json({
      message: 'Specific bike retrieved successfully',
      success: true,
      data: specifiedBikeData,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateSingleBikeData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params as { productId: string };
    const updateBikeData = req.body;
    const specificUpdateBikeData =
      await ProductService.updateSingleBikeDataIntoDB(
        productId,
        updateBikeData,
      );
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: specificUpdateBikeData,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteSingleBikeData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const specificBikeData =
      await ProductService.deleteSingleBikeFromDB(productId);
    res.status(200).json({
      message: 'Bike deleted successfully',
      success: true,
      data: {
        description: 'This bike data is deleted properly from the database',
        deletedData: specificBikeData,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const ProductController = {
  createProduct,
  getAllBikes,
  getSingleBike,
  updateSingleBikeData,
  deleteSingleBikeData,
};
