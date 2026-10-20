// Flechas ← → del teclado para saltar entre secciones, como en una presentación.
import { useEffect } from 'react';
import { secciones } from '../data/content';
import { scrollA } from './useLenis';

export default function useNavegacionTeclado(activo = true) {
  useEffect(() => {
    if (!activo) return undefined;
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const tag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || document.activeElement?.isContentEditable) return;
      // Sección actual: la última cuyo inicio ya pasó la mitad de la pantalla
      const mitad = window.innerHeight * 0.45;
      let i = 0;
      secciones.forEach((id, n) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= mitad) i = n; });
      const destino = e.key === 'ArrowRight' ? Math.min(i + 1, secciones.length - 1) : Math.max(i - 1, 0);
      if (destino === i) return;
      e.preventDefault();
      scrollA(`#${secciones[destino]}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activo]);
}
