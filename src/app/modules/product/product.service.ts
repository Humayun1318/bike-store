import { TProduct } from './product.interface';
import { Product } from './product.model';

//this are the created function
const createProductDataIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

const getAllBikesFromDB = async (searchTerm?: any) => {
  if (!searchTerm) {
    return await Product.find();
  } else {
    return await Product.find({
      $or: [
        { name: { $regex: `^${searchTerm}$`, $options: 'i' } },
        { brand: { $regex: `^${searchTerm}$`, $options: 'i' } },
        { category: { $regex: `^${searchTerm}$`, $options: 'i' } },
      ],
    });
  }
};

const getSingleBikeFromDB = async (id: string) => {
  const singleBike = await Product.findOne({ _id: id });
  return singleBike;
};

const updateSingleBikeDataIntoDB = async (
  id: string,
  updateBikeData: object,
) => {
  const updatedBike = await Product.findByIdAndUpdate(
    { _id: id },
    { $set: updateBikeData },
    { new: true, runValidators: true }, // is used for update doc send to client as a response
  );
  return updatedBike;
};

const deleteSingleBikeFromDB = async (id: string) => {
  const deleteSingleBike = await Product.findOneAndDelete({ _id: id });
  return deleteSingleBike;
};

export const ProductService = {
  createProductDataIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateSingleBikeDataIntoDB,
  deleteSingleBikeFromDB,
};
