// Logger mínimo con fecha; en pruebas no imprime nada.
const env = require('../config/env');

const stamp = () => new Date().toISOString();
const logger = {
  info: (...a) => !env.isTest && console.log(`[${stamp()}] INFO`, ...a),
  warn: (...a) => !env.isTest && console.warn(`[${stamp()}] WARN`, ...a),
  error: (...a) => !env.isTest && console.error(`[${stamp()}] ERROR`, ...a),
};
module.exports = logger;
