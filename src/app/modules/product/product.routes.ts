import express from 'express';
import { ProductController } from './product.controller';
import { validateSpecificProductId } from './middleware.validateId';

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getAllBikes);

//These routes work on any specific Id. Thats why use middleware to handle the error
router.get(
  '/products/:productId',
  validateSpecificProductId,
  ProductController.getSingleBike,
);
router.put(
  '/products/:productId',
  validateSpecificProductId,
  ProductController.updateSingleBikeData,
);
router.delete(
  '/products/:productId',
  validateSpecificProductId,
  ProductController.deleteSingleBikeData,
);

export const ProductRoutes = router;
