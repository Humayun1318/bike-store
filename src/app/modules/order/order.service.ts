import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderDataIntoDB = async (orderData: TOrder) => {
  const { product: productId, quantity: orderQuantity } = orderData;

  // Find the product from the Product collection
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('Product not found in the database');
  }

  // Check if sufficient stock is available
  if (!product.inStock || product.quantity < orderQuantity) {
    throw new Error("Sorry!!, we don't have enough stock for this item");
  }

  //Update product inventory
  product.quantity -= orderQuantity;

  //Update inStock flag if quantity reaches zero
  product.inStock = product.quantity > 0;

  // Save the product
  await product.save();

  //Create the order
  const order = new OrderModel(orderData);
  return await order.save();
};

export const calculateTotalRevenue = async () => {
  const result = await OrderModel.aggregate([
    //for the two collection combined
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    {
      $unwind: '$productDetails',
    },
    {
      $project: {
        totalPrice: { $multiply: ['$productDetails.price', '$quantity'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return result[0]?.totalRevenue || 0;
};

export const OrderService = {
  createOrderDataIntoDB,
  calculateTotalRevenue,
};
