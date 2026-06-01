import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { createProductValidator } from '../validators/product.validator.js';
import multer from 'multer';

import { createProduct,getSellerProducts } from '../controllers/product.controller.js';
import { get } from 'mongoose';
const ProductRouter = express.Router();

const upload = multer({ 
    storage: multer.memoryStorage(),    
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
 });    
 
ProductRouter.post("/", authMiddleware, upload.array("images",7), createProductValidator,  createProduct);

ProductRouter.get("/seller",authMiddleware,getSellerProducts)
export default ProductRouter;