import { Request, Response } from "express";
import { ProductService } from "./product.service";
import ProductValidationSchema from "./product.zod.validation";
import mongoose from "mongoose";

const createProduct = async (req: Request, res: Response) => {
  try {
    // const validateData = ProductValidationSchema.parse(req.body)
    const productData = await ProductService.createProductDataIntoDB(req.body);
    res.status(200).json({
      message: "Bike created successfully",
      success: true,
      data: productData,
    });
  }catch (err : any) {
      res.status(500).json({
        message: "Validation failed",
        success: false,
        error: err,
        stack: err.stack,
      });
  }
}

const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query as { searchTerm?: string };
    // const validateData = ProductValidationSchema.parse(req.body)
    const bikesData = await ProductService.getAllBikesFromDB(searchTerm?.trim());
    res.status(200).json({
      message: "Bikes retrieved successfully",
      success: true,
      data: bikesData,
    });
  }catch (err : any) {
      res.status(500).json({
        message: "Validation failed",
        success: false,
        error: err,
        stack: err.stack,
      });
  }
}

const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const specificBikeData = await ProductService.getSingleBikeFromDB(bikeId);

    res.status(200).json({
      message: "Specific bike retrieved successfully",
      success: true,
      data: specificBikeData,
    });
  }catch (err : any) {
      res.status(500).json({
        message: "Validation failed",
        success: false,
        error: err,
        stack: err.stack,
      });
  }
}

const updateSingleBikeData = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params as { bikeId: string };
    const updateBikeData = req.body ;

    // Validate if `bikeId` is a valid ObjectId
    if (!(bikeId)) {
      return res.status(400).json({
        message: "Invalid Bike ID",
        success: false,
      });
    }

    // Query the database after validation
    const specificUpdateBikeData = await ProductService.updateSingleBikeDataIntoDB(bikeId, updateBikeData);

    // If no bike is found with the provided ID
    if (!specificUpdateBikeData) {
      return res.status(404).json({
        message: "Bike not found",
        success: false,
      });
    }

    // Respond with success and the updated bike data
    res.status(200).json({
      message: "Bike updated successfully",
      success: true,
      data: specificUpdateBikeData,
    });
  } catch (err: any) {
    // Catch any other errors and return a 500 status
    res.status(500).json({
      message: "Server error",
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
};




export const ProductController = {
  createProduct,
  getAllBikes,
  getSingleBike,
  updateSingleBikeData,

}