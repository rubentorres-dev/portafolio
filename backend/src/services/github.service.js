// SERVICIO: estadísticas públicas de GitHub con caché de 1 hora.
// Si GitHub falla, se responde con los últimos datos buenos (si existen) y se deja el motivo en el log.
const env = require('../config/env');
const cache = require('./cache.service');

const UNA_HORA = 60 * 60 * 1000;
const API = 'https://api.github.com';

let ultimoBueno = null; // copia de respaldo que no expira

async function gh(path, conToken = true) {
  const headers = {
    'User-Agent': 'portafolio-rubentorres',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (conToken && env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  const res = await fetch(`${API}${path}`, { headers, signal: AbortSignal.timeout(10000) });

  // Token vencido o mal copiado: se reintenta sin token (API pública).
  if (res.status === 401 && conToken && env.GITHUB_TOKEN) {
    console.error('[github] GITHUB_TOKEN inválido o vencido (401). Reintentando sin token.');
    return gh(path, false);
  }
  if (!res.ok) {
    const restantes = res.headers.get('x-ratelimit-remaining');
    const motivo = res.status === 404
      ? `el usuario "${env.GITHUB_USER}" no existe (revisa GITHUB_USER)`
      : res.status === 403 || res.status === 429
        ? `límite de consultas alcanzado (restantes: ${restantes}); agrega GITHUB_TOKEN`
        : `respuesta ${res.status}`;
    throw new Error(`GitHub ${path}: ${motivo}`);
  }
  return res.json();
}

async function consultar() {
  const [perfil, repos] = await Promise.all([
    gh(`/users/${env.GITHUB_USER}`),
    gh(`/users/${env.GITHUB_USER}/repos?per_page=100&sort=updated`),
  ]);

  // Cuenta lenguajes principales de los repos propios (no forks).
  const conteo = {};
  repos.filter((r) => !r.fork && r.language).forEach((r) => {
    conteo[r.language] = (conteo[r.language] || 0) + 1;
  });
  const total = Object.values(conteo).reduce((a, b) => a + b, 0) || 1;
  const lenguajes = Object.entries(conteo)
    .map(([nombre, n]) => ({ nombre, porcentaje: Math.round((n / total) * 100) }))
    .sort((a, b) => b.porcentaje - a.porcentaje)
    .slice(0, 5);

  return {
    usuario: perfil.login,
    perfil_url: perfil.html_url,
    repos_publicos: perfil.public_repos,
    seguidores: perfil.followers,
    estrellas: repos.reduce((a, r) => a + (r.stargazers_count || 0), 0),
    lenguajes,
    recientes: repos.filter((r) => !r.fork).slice(0, 4).map((r) => ({
      nombre: r.name, url: r.html_url, lenguaje: r.language, actualizado: r.pushed_at,
    })),
    generado: new Date().toISOString(),
  };
}

async function obtenerEstadisticas() {
  const key = `gh:${env.GITHUB_USER}`;
  const enCache = cache.get(key);
  if (enCache) return enCache;

  try {
    const datos = await consultar();
    cache.set(key, datos, UNA_HORA);
    ultimoBueno = datos;
    return datos;
  } catch (e) {
    console.error('[github]', e.message);
    if (ultimoBueno) {
      cache.set(key, ultimoBueno, 10 * 60 * 1000); // reintenta en 10 minutos
      return ultimoBueno;
    }
    throw e;
  }
}

module.exports = { obtenerEstadisticas };
