import express from 'express';
import cors from 'cors';

import config from './config/config.ts';
import { runMigrations } from './database/migrations.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import mangaRoutes from './routes/mangaRoutes.ts';
import userRoutes from './routes/userRoutes.ts';

const app = express();

app.use(express.json());
app.use(cors(config.corsOptions));

// Routes
app.use('/api/manga', mangaRoutes);
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

async function start() {
  await runMigrations();
  app.listen(config.port, async () => {
    console.log(`Server running on port ${config.port}`);
  });
}
start();

export default app;
