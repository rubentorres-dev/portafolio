// Manejador central de errores: nunca expone detalles internos en producción.
const logger = require('../utils/logger');
const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  if (status >= 500) logger.error(err.message);
  res.status(status).json({
    ok: false,
    mensaje: err.status ? err.message : 'Error interno del servidor',
    ...(err.details ? { errores: err.details } : {}),
    ...(env.NODE_ENV === 'development' && status >= 500 ? { detalle: err.message } : {}),
  });
};
