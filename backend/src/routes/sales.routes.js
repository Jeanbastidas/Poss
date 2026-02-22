import { Router } from 'express';
import { createSale, listSales } from '../controllers/sales.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createSaleSchema } from '../models/schemas.js';

export const salesRouter = Router();

salesRouter.get('/', authenticate, listSales);
salesRouter.post('/', authenticate, validate(createSaleSchema), createSale);
