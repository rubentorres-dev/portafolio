// Todas las llamadas al backend en un solo lugar.
// Si el backend no responde, se devuelven datos de respaldo para que el sitio siga funcionando.
import { proyectosRespaldo, articulosRespaldo } from '../data/content';

const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:4000') + '/api';

async function get(ruta) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(BASE + ruta, { signal: ctrl.signal });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.mensaje || 'Error de la API');
    return json.data;
  } finally {
    clearTimeout(timer);
  }
}

const conRespaldo = (promesa, respaldo) => promesa.catch(() => respaldo);

export const api = {
  proyectos: (filtros = {}) => {
    const qs = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v)).toString();
    return conRespaldo(get('/proyectos' + (qs ? `?${qs}` : '')), proyectosRespaldo);
  },
  proyecto: (slug) => conRespaldo(get(`/proyectos/${slug}`), proyectosRespaldo.find((p) => p.slug === slug) || null),
  articulos: () => conRespaldo(get('/articulos'), articulosRespaldo),
  articulo: (slug) => conRespaldo(get(`/articulos/${slug}`), articulosRespaldo.find((a) => a.slug === slug) || null),
  testimonios: () => conRespaldo(get('/testimonios'), []),
  github: () => get('/github/stats'),

  async contacto(datos) {
    const res = await fetch(BASE + '/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    const json = await res.json().catch(() => ({ ok: false, mensaje: 'Respuesta inválida del servidor' }));
    if (!res.ok) {
      const err = new Error(json.mensaje || 'No se pudo enviar el mensaje');
      err.errores = json.errores;
      throw err;
    }
    return json;
  },
};
