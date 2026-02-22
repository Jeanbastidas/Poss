import { Router } from 'express';
import { createCustomer, listCustomers } from '../controllers/customers.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { customerSchema } from '../models/schemas.js';

export const customersRouter = Router();

customersRouter.get('/', authenticate, listCustomers);
customersRouter.post('/', authenticate, validate(customerSchema), createCustomer);
