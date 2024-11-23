import { TProduct } from "./product.interface";
import { Product } from "./product.model";


//
const createProductDataIntoDB = async (productData: TProduct) => {

  const product = new Product(productData);
  const result = await product.save();
  // const product = Product.create(productData);
  return result;
}

const getAllBikesFromDB = async (searchTerm?: string) => {
  if (!searchTerm) {
    return await Product.find()
  } else {
   return await Product.find({
      $or: [
        { name: { $regex: `^${searchTerm}$`, $options: "i" } },
        { brand: { $regex: `^${searchTerm}$`, $options: "i" } },
        { category: { $regex: `^${searchTerm}$`, $options: "i" } },
      ],
    })
  }
}

const getSingleBikeFromDB = async (id: string) => {
  const singleBike = await Product.findOne({ _id : id});
  return singleBike;
}

const updateSingleBikeDataIntoDB = async (id: string, updateBikeData: object) => {
  const updatedBike = await Product.findByIdAndUpdate(
    {_id: id},
    { $set: updateBikeData },
    { new: true, runValidators: true } 
  );
  return updatedBike;
}


export const ProductService = {
  createProductDataIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  updateSingleBikeDataIntoDB,
}