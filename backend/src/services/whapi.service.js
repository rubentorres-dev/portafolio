// SERVICIO: aviso por WhatsApp con Whapi.Cloud (plan Sandbox, gratis).
// Para cuidar el número: máximo WHAPI_MAX_DIA avisos al día y WHAPI_MINUTOS minutos entre avisos.
// Lo que pase de ese límite solo se avisa por Telegram (y siempre queda guardado en la base de datos).
const env = require('../config/env');
const logger = require('../utils/logger');
const Mensaje = require('../models/mensaje.model');

const configurado = () => Boolean(env.WHAPI_TOKEN && env.WHAPI_DESTINO);

// Texto corto y sin enlaces: es lo que menos llama la atención de los filtros de spam.
function armarTexto({ nombre, correo, asunto, mensaje }) {
  const corto = mensaje.length > 300 ? `${mensaje.slice(0, 300)}…` : mensaje;
  return [
    'Nuevo mensaje del portafolio',
    `Nombre: ${nombre}`,
    `Correo: ${correo.replace(/\./g, '․')}`, // punto especial: evita que WhatsApp lo convierta en enlace
    asunto ? `Asunto: ${asunto}` : null,
    '',
    corto,
  ].filter((l) => l !== null).join('\n');
}

async function enviar(texto) {
  const res = await fetch('https://gate.whapi.cloud/messages/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${env.WHAPI_TOKEN}` },
    body: JSON.stringify({ to: env.WHAPI_DESTINO, body: texto, no_link_preview: true }),
  });
  if (!res.ok) throw new Error(`Whapi respondió ${res.status}`);
}

async function notificarMensaje(id, datos) {
  if (!configurado()) {
    logger.warn('Whapi no configurado: no se envió aviso por WhatsApp.');
    return false;
  }
  const turno = await Mensaje.reservarAvisoWhatsapp(id, { maxDia: env.WHAPI_MAX_DIA, minutos: env.WHAPI_MINUTOS });
  if (!turno) {
    logger.info('Límite de avisos por WhatsApp alcanzado: este mensaje solo se avisa por Telegram.');
    return false;
  }
  try {
    await enviar(armarTexto(datos));
    return true;
  } catch (e) {
    await Mensaje.liberarAvisoWhatsapp(id).catch(() => {});
    throw e;
  }
}

module.exports = { notificarMensaje, armarTexto, configurado, enviar };
