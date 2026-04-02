import express from 'express';
import cors from 'cors';

import itemRoutes from './routes/itemRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import config from './config/config.ts';

const app = express();

app.use(express.json());
app.use(cors(config.corsOptions));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
