// Límites del formulario: 5 por hora por persona (IP) y CONTACTO_MAX_HORA por hora en total.
const rateLimit = require('express-rate-limit');
const env = require('../config/env');

const contactoLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: env.isTest ? 1000 : 5, // en las pruebas automáticas no se limita
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, mensaje: 'Demasiados mensajes. Intenta de nuevo en una hora.' },
});

// Tope general: cuenta los envíos de todos los visitantes juntos.
const contactoGlobalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: env.isTest ? 1000 : env.CONTACTO_MAX_HORA,
  keyGenerator: () => 'global',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, mensaje: 'Estoy recibiendo muchos mensajes ahora. Escríbeme por WhatsApp o intenta en un rato.' },
});

const apiLimiter = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false });

module.exports = { contactoLimiter, contactoGlobalLimiter, apiLimiter };
