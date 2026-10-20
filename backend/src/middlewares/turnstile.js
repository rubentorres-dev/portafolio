// Verifica el token de Cloudflare Turnstile (anti-bots) en el servidor.
// Si TURNSTILE_SECRET está vacío (desarrollo/pruebas), se omite la verificación.
const env = require('../config/env');
const logger = require('../utils/logger');

const URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

module.exports = async (req, res, next) => {
  if (!env.TURNSTILE_SECRET) return next();
  const token = req.body?.turnstile_token;
  if (!token) return res.status(400).json({ ok: false, mensaje: 'Completa la verificación de seguridad' });
  try {
    const r = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: req.ip }),
    });
    const data = await r.json();
    if (!data.success) return res.status(400).json({ ok: false, mensaje: 'La verificación de seguridad falló. Intenta de nuevo.' });
    next();
  } catch (e) {
    logger.error('Turnstile:', e.message);
    res.status(503).json({ ok: false, mensaje: 'No se pudo verificar el formulario. Intenta más tarde.' });
  }
};
