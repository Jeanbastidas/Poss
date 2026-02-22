import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import { startNotificationCron } from './cron/notifications.cron.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'POS API' }));
app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(env.port, () => {
  startNotificationCron();
  console.log(`API POS escuchando en ${env.port}`);
});
