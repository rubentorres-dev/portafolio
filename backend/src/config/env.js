// Lee las variables de entorno y define valores por defecto.
require('dotenv').config();
// Algunas redes fallan por IPv6: se prefiere IPv4 para las conexiones salientes (Telegram, Whapi, GitHub).
require('dns').setDefaultResultOrder('ipv4first');

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 4000,
  DATABASE_URL: process.env.DATABASE_URL || '',
  CORS_ORIGIN: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((o) => o.trim()),
  GITHUB_USER: process.env.GITHUB_USER || 'rubentorres-dev',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || '',
  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET || '',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
  WHAPI_TOKEN: process.env.WHAPI_TOKEN || '',
  WHAPI_DESTINO: process.env.WHAPI_DESTINO || '',
  WHAPI_MAX_DIA: Number(process.env.WHAPI_MAX_DIA) || 5,
  WHAPI_MINUTOS: Number(process.env.WHAPI_MINUTOS) || 2,
  CONTACTO_MAX_HORA: Number(process.env.CONTACTO_MAX_HORA) || 15,
};

env.isTest = env.NODE_ENV === 'test';
module.exports = env;
