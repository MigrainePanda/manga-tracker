import express from 'express';
import itemRoutes from './routes/itemRoutes.ts';
import userRoutes from './routes/userRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

const app = express();

app.use(express.json());

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
