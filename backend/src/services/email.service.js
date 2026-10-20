// SERVICIO: aviso por correo de cada mensaje nuevo (Gmail + contraseña de aplicación).
const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../utils/logger');

const configurado = Boolean(env.SMTP_USER && env.SMTP_PASS && env.CONTACT_EMAIL);
const transporter = configurado
  ? nodemailer.createTransport({ service: 'gmail', auth: { user: env.SMTP_USER, pass: env.SMTP_PASS } })
  : null;

const escapar = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function notificarMensaje({ nombre, correo, asunto, mensaje }) {
  if (!configurado) {
    logger.warn('Correo no configurado: el mensaje se guardó pero no se envió aviso.');
    return false;
  }
  await transporter.sendMail({
    from: `"Portafolio" <${env.SMTP_USER}>`,
    to: env.CONTACT_EMAIL,
    replyTo: correo,
    subject: `Nuevo mensaje del portafolio: ${asunto || 'Sin asunto'}`,
    html: `<h2>Nuevo mensaje</h2>
      <p><b>Nombre:</b> ${escapar(nombre)}</p>
      <p><b>Correo:</b> ${escapar(correo)}</p>
      <p><b>Asunto:</b> ${escapar(asunto)}</p>
      <p><b>Mensaje:</b><br>${escapar(mensaje).replace(/\n/g, '<br>')}</p>`,
  });
  return true;
}

module.exports = { notificarMensaje };
