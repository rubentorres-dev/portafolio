// Scroll suave tipo Apple (Lenis) sincronizado con GSAP ScrollTrigger.
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefiereMenosMovimiento } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);
// En celulares la barra del navegador aparece/desaparece al bajar: no recalcular todo por eso (evita tirones).
ScrollTrigger.config({ ignoreMobileResize: true });

let instancia = null;

// Desplaza a un elemento (#id) con scroll suave si está activo.
// Si la sección cabe en la pantalla, queda CENTRADA; si es más alta, se muestra desde su inicio.
export function scrollA(destino) {
  const seccion = typeof destino === 'string' ? document.querySelector(destino) : destino;
  if (!seccion) return;
  // Si la sección marca un elemento con data-centrar (ej. el globo), se centra ese elemento.
  const el = seccion.querySelector('[data-centrar]') || seccion;
  const barra = 80; // alto de la barra de navegación flotante
  const alto = el.offsetHeight;
  const libre = window.innerHeight - barra;
  const offset = alto < libre ? -(barra + (libre - alto) / 2) : (el === seccion ? 0 : -barra);
  if (instancia) instancia.scrollTo(el, { offset, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}

export default function useLenis() {
  useEffect(() => {
    // En celulares y tablets el scroll nativo es el más fluido y estable: Lenis solo con mouse/trackpad.
    if (prefiereMenosMovimiento() || window.matchMedia('(pointer: coarse)').matches) return undefined;
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
