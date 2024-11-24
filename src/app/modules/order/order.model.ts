import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: function (value: string) {
          // Regex for validating email
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Invalid email format',
      },
    },
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product Id is required'],
      validate: {
        validator: function (value: any) {
          // Check if value is a valid ObjectId
          return mongoose.Types.ObjectId.isValid(value);
        },
        message: 'Invalid Product Id. It must be a valid ObjectId',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total Price is required'],
      min: [1, 'Total Price must be a positive number'],
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt
);

export const OrderModel = model<TOrder>('Order', orderSchema);
