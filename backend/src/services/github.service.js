// SERVICIO: estadísticas públicas de GitHub con caché de 1 hora.
const env = require('../config/env');
const cache = require('./cache.service');

const UNA_HORA = 60 * 60 * 1000;
const API = 'https://api.github.com';

async function gh(path) {
  const headers = { 'User-Agent': 'portafolio-rubentorres', Accept: 'application/vnd.github+json' };
  if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
  return res.json();
}

async function obtenerEstadisticas() {
  const key = `gh:${env.GITHUB_USER}`;
  const enCache = cache.get(key);
  if (enCache) return enCache;

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

  const datos = {
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
  cache.set(key, datos, UNA_HORA);
  return datos;
}

module.exports = { obtenerEstadisticas };
