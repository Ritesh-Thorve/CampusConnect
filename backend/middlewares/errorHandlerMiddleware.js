export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack); // Log error for debugging
  res.status(500).json({ error: err.message || 'Internal Server Error' });
};
