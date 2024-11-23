import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router()


router.post('/products', ProductController.createProduct)
router.get('/products', ProductController.getAllBikes)
router.get('/products/:bikeId', ProductController.getSingleBike)
router.put('/products/:bikeId', ProductController.updateSingleBikeData)


export const ProductRoutes = router;