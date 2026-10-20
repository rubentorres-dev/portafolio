// SERVICIO: aviso por Telegram de cada mensaje nuevo, con la API oficial de bots (gratis y sin límite práctico).
// Configura TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en el .env. Si están vacíos, no se envía nada.
const env = require('../config/env');
const logger = require('../utils/logger');

const configurado = () => Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);

// Texto plano (sin Markdown) para que nada de lo que escriba el visitante cambie el formato.
function armarTexto({ nombre, correo, asunto, mensaje }) {
  const corto = mensaje.length > 3000 ? `${mensaje.slice(0, 3000)}…` : mensaje;
  return [
    '📩 Nuevo mensaje del portafolio',
    `👤 ${nombre}`,
    `✉️ ${correo}`,
    asunto ? `📌 ${asunto}` : null,
    '',
    corto,
  ].filter((l) => l !== null).join('\n');
}

async function notificarMensaje(datos) {
  if (!configurado()) {
    logger.warn('Telegram no configurado: no se envió aviso.');
    return false;
  }
  const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: armarTexto(datos), disable_web_page_preview: true }),
  });
  if (!res.ok) throw new Error(`Telegram respondió ${res.status}`);
  return true;
}

module.exports = { notificarMensaje, armarTexto, configurado };
