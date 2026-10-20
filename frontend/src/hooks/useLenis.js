// Scroll suave tipo Apple (Lenis) sincronizado con GSAP ScrollTrigger.
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefiereMenosMovimiento } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

let instancia = null;

// Desplaza a un elemento (#id) con scroll suave si está activo.
// Si la sección cabe en la pantalla, queda CENTRADA; si es más alta, se muestra desde su inicio.
export function scrollA(destino) {
  const el = typeof destino === 'string' ? document.querySelector(destino) : destino;
  if (!el) return;
  const alto = el.offsetHeight;
  const offset = alto < window.innerHeight ? -(window.innerHeight - alto) / 2 : 0;
  if (instancia) instancia.scrollTo(el, { offset, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

export default function useLenis() {
  useEffect(() => {
    if (prefiereMenosMovimiento()) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    instancia = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      instancia = null;
    };
  }, []);
}
