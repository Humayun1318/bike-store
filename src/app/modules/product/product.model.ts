// product.model.ts

import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';


// Mongoose Schema for the Product model (Bike)
const productSchema: Schema<TProduct> = new Schema(
  {
    name: { type: String, required: [true, "Product name is missing"] },
    brand: { type: String, required: [true, "Product brand is missing"] },
    price: {
      type: Number, required: [true, "Product price is missing"],
      min: [0, "Price must be a positive number"],
     },
    category: {
      type: String,
      enum: {
        values: ['Mountain', 'Hybrid', 'Road', 'Electric'],
        message: "Product category must be following this, ['Mountain', 'Hybrid', 'Road', 'Electric']. '{VALUE}' is wrong category."
      },
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { timestamps: true } // Optionally adds createdAt and updatedAt fields to the schema
);

// Create a Mongoose model from the schema
export const Product = model<TProduct>('Product', productSchema);
