// Título, descripción y URL canónica de cada página (SEO).
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITIO = import.meta.env.VITE_SITE_URL || 'https://rubentorres-dev.vercel.app';
const DESCRIPCION = 'Portafolio de Rubén Torres Osorio, desarrollador full-stack junior en Barranquilla, Colombia. Proyectos en Java, JavaScript, Python y PHP. Disponible para trabajo remoto y freelance.';

function meta(selector, crear, valor) {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement(crear.tag); Object.entries(crear.attrs).forEach(([k, v]) => el.setAttribute(k, v)); document.head.appendChild(el); }
  el.setAttribute(crear.campo, valor);
}

export default function useSeo({ titulo, descripcion = DESCRIPCION, noindex = false } = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const t = titulo ? `${titulo} · Rubén Torres Osorio` : 'Rubén Torres Osorio · Desarrollador Full-Stack';
    document.title = t;
    meta('meta[name="description"]', { tag: 'meta', attrs: { name: 'description' }, campo: 'content' }, descripcion);
    meta('meta[property="og:title"]', { tag: 'meta', attrs: { property: 'og:title' }, campo: 'content' }, t);
    meta('meta[property="og:description"]', { tag: 'meta', attrs: { property: 'og:description' }, campo: 'content' }, descripcion);
    meta('meta[property="og:url"]', { tag: 'meta', attrs: { property: 'og:url' }, campo: 'content' }, SITIO + pathname);
    meta('link[rel="canonical"]', { tag: 'link', attrs: { rel: 'canonical' }, campo: 'href' }, SITIO + (pathname === '/' ? '/' : pathname.replace(/\/$/, '')));
    meta('meta[name="robots"]', { tag: 'meta', attrs: { name: 'robots' }, campo: 'content' }, noindex ? 'noindex, follow' : 'index, follow');
  }, [titulo, descripcion, noindex, pathname]);
}
