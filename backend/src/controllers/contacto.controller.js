// CONTROLADOR: guarda el mensaje y envía los avisos por correo, Telegram y WhatsApp (Whapi).
const Mensaje = require('../models/mensaje.model');
const email = require('../services/email.service');
const telegram = require('../services/telegram.service');
const whapi = require('../services/whapi.service');
const logger = require('../utils/logger');
const { VERSIONES } = require('../config/legal');

const corto = (v, max) => (v ? String(v).slice(0, max) : null);

async function enviar(req, res, next) {
  try {
    const { nombre, correo, asunto, mensaje, versionLegal } = req.body;
    const doc = VERSIONES[versionLegal];
    // Prueba de la autorización: cuándo (fecha del servidor), cómo (formulario web, página, IP y
    // navegador) y qué aceptó (texto exacto de la versión). El texto lo pone el servidor, no el navegador.
    const consentimiento = {
      version: versionLegal,
      textoTerminos: `${doc.terminos} (${doc.urlTerminos})`,
      textoPrivacidad: `${doc.privacidad} (${doc.urlPrivacidad})`,
      pagina: corto(req.get('referer') || req.get('origin'), 255),
      ip: corto(req.ip, 64),
      navegador: corto(req.get('user-agent'), 300),
    };
    const guardado = await Mensaje.crearConConsentimiento({ nombre, correo, asunto, mensaje }, consentimiento);
    // Los avisos (correo, Telegram y WhatsApp) no deben tumbar la respuesta si fallan.
    const datos = { nombre, correo, asunto, mensaje };
    email.notificarMensaje(datos).catch((e) => logger.error('No se pudo enviar el correo:', e.message));
    telegram.notificarMensaje(datos).catch((e) => logger.error('No se pudo enviar el aviso de Telegram:', e.message));
    whapi.notificarMensaje(guardado.id, datos).catch((e) => logger.error('No se pudo enviar el WhatsApp:', e.message));
    res.status(201).json({ ok: true, mensaje: 'Mensaje enviado. ¡Gracias por escribir!', id: guardado.id });
  } catch (e) { next(e); }
}

module.exports = { enviar };
