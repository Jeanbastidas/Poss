import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { salesRouter } from './sales.routes.js';
import { customersRouter } from './customers.routes.js';
import { creditsRouter } from './credits.routes.js';
import { productsRouter } from './products.routes.js';
import { reportsRouter } from './reports.routes.js';
import { settingsRouter } from './settings.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/sales', salesRouter);
apiRouter.use('/customers', customersRouter);
apiRouter.use('/credits', creditsRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/reports', reportsRouter);
apiRouter.use('/settings', settingsRouter);
