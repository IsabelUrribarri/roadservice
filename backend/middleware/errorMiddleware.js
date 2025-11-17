// middleware/errorMiddleware.js

// Middleware de manejo de errores
export const errorHandler = (err, req, res, next) => {
  // Si ya se había seteado un status code, lo usamos, si no, 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode);
  res.json({
    message: err.message,
    // Solo mostramos el stack trace en desarrollo
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
