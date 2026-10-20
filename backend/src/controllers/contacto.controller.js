// CONTROLADOR: guarda el mensaje y envía los avisos por correo, Telegram y WhatsApp (Whapi).
const Mensaje = require('../models/mensaje.model');
const email = require('../services/email.service');
const telegram = require('../services/telegram.service');
const whapi = require('../services/whapi.service');
const logger = require('../utils/logger');

async function enviar(req, res, next) {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;
    const guardado = await Mensaje.crear({ nombre, correo, asunto, mensaje });
    // Los avisos (correo, Telegram y WhatsApp) no deben tumbar la respuesta si fallan.
    const datos = { nombre, correo, asunto, mensaje };
    email.notificarMensaje(datos).catch((e) => logger.error('No se pudo enviar el correo:', e.message));
    telegram.notificarMensaje(datos).catch((e) => logger.error('No se pudo enviar el aviso de Telegram:', e.message));
    whapi.notificarMensaje(guardado.id, datos).catch((e) => logger.error('No se pudo enviar el WhatsApp:', e.message));
    res.status(201).json({ ok: true, mensaje: 'Mensaje enviado. ¡Gracias por escribir!', id: guardado.id });
  } catch (e) { next(e); }
}

module.exports = { enviar };
