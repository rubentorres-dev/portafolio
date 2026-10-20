// MODELO: testimonios (solo los aprobados se muestran).
const { query } = require('../config/db');

async function listarAprobados() {
  const { rows } = await query(
    `SELECT id, nombre, cargo, relacion, texto FROM testimonios
     WHERE aprobado = TRUE ORDER BY id DESC`
  );
  return rows;
}

module.exports = { listarAprobados };
