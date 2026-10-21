// Exporta el registro de autorizaciones (prueba ante la SIC) a un archivo CSV.
// Uso:  npm run consentimientos                      → todas las autorizaciones
//       npm run consentimientos -- persona@correo.com → solo las de ese correo
// Usa la base de datos de DATABASE_URL (backend/.env). Para la de producción (Neon) es más
// fácil usar el "SQL Editor" de Neon con la consulta que está en docs/REGISTRO_CONSENTIMIENTOS.md.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

(async () => {
  const url = process.env.DATABASE_URL;
  if (!url) return console.log('❌ Falta DATABASE_URL en backend/.env');
  const pool = new Pool({ connectionString: url, ssl: url.includes('neon.tech') ? { rejectUnauthorized: false } : false });
  const correo = (process.argv[2] || '').trim().toLowerCase();
  try {
    const { rows } = await pool.query(
      `SELECT id, to_char(aceptado_en AT TIME ZONE 'America/Bogota', 'YYYY-MM-DD HH24:MI:SS') AS fecha_hora_colombia,
              aceptado_en AS fecha_hora_utc, nombre, correo,
              acepta_terminos, acepta_privacidad, version_documentos, medio, pagina, ip, navegador,
              texto_terminos, texto_privacidad, mensaje_id
         FROM consentimientos
        WHERE ($1 = '' OR correo = $1)
        ORDER BY aceptado_en DESC`,
      [correo]
    );
    if (!rows.length) return console.log('No hay autorizaciones' + (correo ? ` para ${correo}` : '') + '.');
    const cols = Object.keys(rows[0]);
    const celda = (v) => `"${String(v instanceof Date ? v.toISOString() : v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => celda(r[c])).join(','))].join('\n');
    const archivo = path.join(process.cwd(), `consentimientos${correo ? '-' + correo.replace(/[^a-z0-9]/g, '_') : ''}.csv`);
    fs.writeFileSync(archivo, '﻿' + csv); // BOM para que Excel muestre bien las tildes
    console.log(`✅ ${rows.length} autorización(es) exportada(s) a ${archivo}`);
  } catch (e) {
    console.log('❌ No se pudo leer el registro:', e.message);
  } finally {
    await pool.end();
  }
})();
