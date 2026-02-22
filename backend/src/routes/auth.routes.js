import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../models/schemas.js';

export const authRouter = Router();

authRouter.post('/login', validate(loginSchema), login);
