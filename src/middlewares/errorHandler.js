import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res
      .status(error.status || 500)
      .json({
        status: error.status || 500,
        message: error.message,
        data: null, 
      });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: null,
  });
};