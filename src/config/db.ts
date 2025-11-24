import { Pool } from 'pg';
import { env } from './env';

export const pool = new Pool({
  connectionString: env.databaseUrl
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
