// Envía un WhatsApp de prueba con Whapi (no gasta el cupo diario del formulario).
// Uso: npm run whatsapp:probar
require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first');

(async () => {
  const token = process.env.WHAPI_TOKEN;
  const destino = process.env.WHAPI_DESTINO;
  if (!token || !destino) return console.log('❌ Falta WHAPI_TOKEN o WHAPI_DESTINO en backend/.env');
  const res = await fetch('https://gate.whapi.cloud/messages/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ to: destino, body: 'Prueba del portafolio: el aviso por WhatsApp funciona.' }),
  });
  if (res.ok) return console.log('✅ Mensaje enviado. Revisa tu WhatsApp, en el chat "Tú".');
  console.log(`❌ Whapi respondió ${res.status}:`, (await res.text()).slice(0, 300));
})().catch((e) => console.log('❌ No se pudo conectar:', e.cause?.code || e.message, '· Revisa tu internet e intenta de nuevo.'));
