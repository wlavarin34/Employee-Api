import express from 'express';
import { employeeRouter } from './modules/employees/employees.routes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/employees', employeeRouter);

  app.use(errorHandler);

  return app;
};
