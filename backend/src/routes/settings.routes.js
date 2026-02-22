import { Router } from 'express';
import { getSettings, upsertSetting } from '../controllers/settings.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { settingSchema } from '../models/schemas.js';

export const settingsRouter = Router();

settingsRouter.get('/', authenticate, getSettings);
settingsRouter.put('/', authenticate, authorize('ADMINISTRADOR', 'SUPERVISOR'), validate(settingSchema), upsertSetting);
