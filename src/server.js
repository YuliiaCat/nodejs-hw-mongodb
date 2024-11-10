import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { env } from './utils/env.js';
import { UPLOAD_DIR } from './constants/index.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  createDirIfNotExists(UPLOAD_DIR);

  app.use(cookieParser());
  app.use(express.json());
  app.use(cors());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

