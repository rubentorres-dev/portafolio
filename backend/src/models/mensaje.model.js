// MODELO: mensajes del formulario de contacto.
const { query } = require('../config/db');

async function crear({ nombre, correo, asunto, mensaje }) {
  const { rows } = await query(
    `INSERT INTO mensajes (nombre, correo, asunto, mensaje)
     VALUES ($1, $2, $3, $4) RETURNING id, fecha`,
    [nombre, correo, asunto || null, mensaje]
  );
  return rows[0];
}

// Reserva el turno de aviso por WhatsApp solo si hoy (hora de Colombia) van menos de `maxDia`
// avisos y el último fue hace más de `minutos`. Devuelve true si el turno quedó reservado.
async function reservarAvisoWhatsapp(id, { maxDia, minutos }) {
  const { rowCount } = await query(
    `UPDATE mensajes SET aviso_whatsapp = NOW()
      WHERE id = $1
        AND (SELECT COUNT(*) FROM mensajes
              WHERE aviso_whatsapp >= (date_trunc('day', NOW() AT TIME ZONE 'America/Bogota') AT TIME ZONE 'America/Bogota')) < $2
        AND COALESCE((SELECT MAX(aviso_whatsapp) FROM mensajes), 'epoch') < NOW() - make_interval(mins => $3)`,
    [id, maxDia, minutos]
  );
  return rowCount === 1;
}

// Si el envío falla, se libera el turno para no gastar el cupo del día.
async function liberarAvisoWhatsapp(id) {
  await query('UPDATE mensajes SET aviso_whatsapp = NULL WHERE id = $1', [id]);
}

module.exports = { crear, reservarAvisoWhatsapp, liberarAvisoWhatsapp };
