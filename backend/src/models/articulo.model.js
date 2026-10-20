// MODELO: artículos del blog (solo publicados).
const { query } = require('../config/db');

async function listar() {
  const { rows } = await query(
    `SELECT id, slug, titulo, resumen, etiquetas, minutos_lectura, fecha
     FROM articulos WHERE publicado = TRUE ORDER BY fecha DESC`
  );
  return rows;
}

async function obtenerPorSlug(slug) {
  const { rows } = await query(
    `SELECT id, slug, titulo, resumen, contenido_md, etiquetas, minutos_lectura, fecha
     FROM articulos WHERE slug = $1 AND publicado = TRUE`,
    [slug]
  );
  return rows[0] || null;
}

module.exports = { listar, obtenerPorSlug };
