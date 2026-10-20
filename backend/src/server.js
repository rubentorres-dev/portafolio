// Punto de arranque del servidor.
const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');

if (!env.DATABASE_URL) logger.warn('DATABASE_URL vacío: las rutas que usan la base de datos fallarán.');

app.listen(env.PORT, () => logger.info(`API escuchando en http://localhost:${env.PORT}`));
