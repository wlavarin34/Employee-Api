import { createApp } from './app';
import { env } from './config/env';
import { connectRedis } from './config/redis';
import { pool } from './config/db';

const start = async () => {
  try {
    await connectRedis();
    await pool.query('SELECT 1'); // sanity check DB

    const app = createApp();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

start();
