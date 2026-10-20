// Muestra tu TELEGRAM_CHAT_ID. Antes: crea el bot con @BotFather, pon el token en .env
// y envíale /start a tu bot desde Telegram. Uso: npm run telegram:id
require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first');

(async () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return console.log('❌ Falta TELEGRAM_BOT_TOKEN en backend/.env');
  const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
  const data = await res.json();
  if (!data.ok) return console.log('❌ Token inválido. Revísalo en @BotFather.');
  const chats = [...new Map(data.result.map((u) => u.message?.chat).filter(Boolean).map((c) => [c.id, c])).values()];
  if (!chats.length) return console.log('⚠️  No hay mensajes. Abre tu bot en Telegram, envíale /start y vuelve a correr este comando.');
  chats.forEach((c) => console.log(`✅ ${c.first_name || c.title || ''}: TELEGRAM_CHAT_ID=${c.id}`));
})().catch((e) => console.log('❌ No se pudo conectar:', e.cause?.code || e.message, '· Revisa tu internet e intenta de nuevo.'));
