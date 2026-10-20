-- v18: registra cuándo se envió el aviso de WhatsApp (Green API) de cada mensaje.
-- Sirve para limitar los avisos (máximo por día y separación mínima) aunque el servidor se reinicie.
-- Se puede correr varias veces sin problema.
ALTER TABLE mensajes ADD COLUMN IF NOT EXISTS aviso_whatsapp TIMESTAMPTZ;
CREATE INDEX IF NOT EXISTS idx_mensajes_aviso_whatsapp ON mensajes (aviso_whatsapp);
