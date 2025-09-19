// utils/responseHandler.js
export const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: true,
    data,
    message,
    error: { explanation: [] },
  });
};

export const sendError = (res, message = 'Error', explanation = [], statusCode = 500) => {
  res.status(statusCode).json({
    status: false,
    data: {},
    message,
    error: { explanation },
  });
};