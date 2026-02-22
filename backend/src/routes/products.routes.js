import { Router } from 'express';
import { createProduct, listProducts } from '../controllers/products.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { productSchema } from '../models/schemas.js';

export const productsRouter = Router();

productsRouter.get('/', authenticate, listProducts);
productsRouter.post('/', authenticate, validate(productSchema), createProduct);
