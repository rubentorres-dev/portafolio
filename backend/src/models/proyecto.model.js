// MODELO: consultas SQL de proyectos y sus tecnologías.
const { query } = require('../config/db');

const BASE = `
  SELECT p.id, p.slug, p.titulo, p.resumen, p.descripcion, p.nivel, p.estado,
         p.repo_url, p.demo_url, p.imagen, p.destacado, p.orden,
         COALESCE(array_agg(t.nombre ORDER BY t.nombre) FILTER (WHERE t.id IS NOT NULL), '{}') AS tecnologias
  FROM proyectos p
  LEFT JOIN proyecto_tecnologia pt ON pt.proyecto_id = p.id
  LEFT JOIN tecnologias t ON t.id = pt.tecnologia_id`;

async function listar({ lenguaje, nivel, destacado } = {}) {
  const where = [];
  const params = [];
  if (nivel) { params.push(Number(nivel)); where.push(`p.nivel = $${params.length}`); }
  if (destacado) where.push('p.destacado = TRUE');
  if (lenguaje) {
    params.push(lenguaje.toLowerCase());
    where.push(`p.id IN (SELECT pt2.proyecto_id FROM proyecto_tecnologia pt2
                JOIN tecnologias t2 ON t2.id = pt2.tecnologia_id WHERE LOWER(t2.nombre) = $${params.length})`);
  }
  const sql = `${BASE} ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
               GROUP BY p.id ORDER BY p.orden, p.id`;
  const { rows } = await query(sql, params);
  return rows;
}

async function obtenerPorSlug(slug) {
  const { rows } = await query(`${BASE} WHERE p.slug = $1 GROUP BY p.id`, [slug]);
  return rows[0] || null;
}

module.exports = { listar, obtenerPorSlug };
