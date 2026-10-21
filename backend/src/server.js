// Punto de arranque del servidor.
const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');

if (!env.DATABASE_URL) logger.warn('DATABASE_URL vacío: las rutas que usan la base de datos fallarán.');

app.listen(env.PORT, () => logger.info(`API escuchando en http://localhost:${env.PORT}`));

// Limpieza automática según los plazos de la política de datos (al arrancar y una vez al día).
if (env.DATABASE_URL && env.NODE_ENV !== 'test') {
  const { limpiarAntiguos } = require('./models/mensaje.model');
  const limpiar = () => limpiarAntiguos()
    .then((r) => (r.mensajes || r.consentimientos) && logger.info('Limpieza de datos antiguos:', r))
    .catch((e) => logger.warn('No se pudo limpiar datos antiguos:', e.message));
  setTimeout(limpiar, 60 * 1000).unref();
  setInterval(limpiar, 24 * 60 * 60 * 1000).unref();
}
