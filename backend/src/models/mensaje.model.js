// MODELO: mensajes del formulario de contacto.
const { query, pool } = require('../config/db');

async function crear({ nombre, correo, asunto, mensaje }) {
  const { rows } = await query(
    `INSERT INTO mensajes (nombre, correo, asunto, mensaje)
     VALUES ($1, $2, $3, $4) RETURNING id, fecha`,
    [nombre, correo, asunto || null, mensaje]
  );
  return rows[0];
}

// Guarda el mensaje y el registro de autorización en UNA transacción:
// si algo falla, no queda un mensaje sin su prueba de consentimiento (ni al revés).
async function crearConConsentimiento({ nombre, correo, asunto, mensaje }, c) {
  const cliente = await pool.connect();
  try {
    await cliente.query('BEGIN');
    const { rows } = await cliente.query(
      `INSERT INTO mensajes (nombre, correo, asunto, mensaje)
       VALUES ($1, $2, $3, $4) RETURNING id, fecha`,
      [nombre, correo, asunto || null, mensaje]
    );
    await cliente.query(
      `INSERT INTO consentimientos
         (mensaje_id, correo, nombre, acepta_terminos, acepta_privacidad, version_documentos,
          texto_terminos, texto_privacidad, pagina, ip, navegador)
       VALUES ($1, $2, $3, TRUE, TRUE, $4, $5, $6, $7, $8, $9)`,
      [rows[0].id, correo, nombre, c.version, c.textoTerminos, c.textoPrivacidad, c.pagina, c.ip, c.navegador]
    );
    await cliente.query('COMMIT');
    return rows[0];
  } catch (e) {
    await cliente.query('ROLLBACK').catch(() => {});
    throw e;
  } finally {
    cliente.release();
  }
}

// Plazos de conservación prometidos en la Política de datos personales:
// mensajes máximo 12 meses; registro de autorización hasta 5 años después de borrar el mensaje.
async function limpiarAntiguos() {
  const m = await query(`DELETE FROM mensajes WHERE fecha < NOW() - INTERVAL '12 months'`);
  const c = await query(`DELETE FROM consentimientos WHERE mensaje_id IS NULL AND aceptado_en < NOW() - INTERVAL '5 years'`);
  return { mensajes: m.rowCount, consentimientos: c.rowCount };
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

module.exports = { crear, crearConConsentimiento, limpiarAntiguos, reservarAvisoWhatsapp, liberarAvisoWhatsapp };
