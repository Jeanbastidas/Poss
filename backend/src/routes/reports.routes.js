import { Router } from 'express';
import { salesSummary, topProducts } from '../controllers/reports.controller.js';
import { authenticate } from '../middleware/auth.js';

export const reportsRouter = Router();

reportsRouter.get('/sales-summary', authenticate, salesSummary);
reportsRouter.get('/top-products', authenticate, topProducts);
