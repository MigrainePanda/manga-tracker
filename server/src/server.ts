import app from './app.ts';
import config from './config/config.ts';
import { runMigrations } from './database/migrations.ts';

app.listen(config.port, () => {
  runMigrations();
  console.log(`Server running on port ${config.port}`);
});
