import { Router } from 'express';
import { createCredit, listPortfolio, recordCreditPayment } from '../controllers/credits.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { creditPaymentSchema, creditSchema } from '../models/schemas.js';

export const creditsRouter = Router();

creditsRouter.get('/portfolio', authenticate, listPortfolio);
creditsRouter.post('/', authenticate, validate(creditSchema), createCredit);
creditsRouter.post('/:id/payments', authenticate, validate(creditPaymentSchema), recordCreditPayment);
