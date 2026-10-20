// Detecta qué sección está en el centro de la pantalla (scroll spy).
import { useEffect, useState } from 'react';
import { secciones } from '../data/content';

export default function useSeccionActiva(activo = true) {
  const [actual, setActual] = useState('inicio');
  useEffect(() => {
    if (!activo) return undefined;
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setActual(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const t = setTimeout(() => secciones.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); }), 300);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [activo]);
  return actual;
}
