import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof isHttpError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      data: null, 
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: null,
  });
};