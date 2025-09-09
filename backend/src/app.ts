import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const createApp = (): Application => {
  const app = express();

  // CORS dinámico para desarrollo y producción
  const corsOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'];
  
  // En Railway, usar la URL pública automáticamente
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    corsOrigins.push(`https://${process.env.RAILWAY_PUBLIC_DOMAIN}`);
  }
  
  // En Vercel, usar la URL de Vercel automáticamente
  if (process.env.VERCEL_URL) {
    corsOrigins.push(`https://${process.env.VERCEL_URL}`);
  }

  app.use(cors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.use(express.json());

  // Routes
  // lazy import to avoid circular deps in tests
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const leaguesRouter = require('./routes/leagues').default;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const clubsRouter = require('./routes/clubs').default;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const matchesRouter = require('./routes/matches').default;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const authRouter = require('./routes/auth').default;

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/leagues', leaguesRouter);
  app.use('/api/v1/clubs', clubsRouter);
  app.use('/api/v1/matches', matchesRouter);

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
};


