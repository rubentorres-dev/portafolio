// "Modo ligero" automático: mismo diseño y colores, pero el agujero negro usa menos capas animadas,
// sin la mezcla de luz costosa y sin agrandarse al hacer scroll. Así no se traba en equipos de baja potencia.
//
// Quién lo recibe:
//  - iPhone / iPad: NUNCA (tienen buena tarjeta gráfica: se dejan todos los efectos).
//  - Android y otros táctiles: solo si el equipo es de gama media/baja (menos de 8 GB de RAM,
//    ej. Xiaomi Note 11S) o si el navegador no informa la memoria.
//  - Computadores: solo si tienen 4 núcleos o menos, o poca memoria.
//  - Además, si un equipo con efectos completos va lento (menos de 40 cuadros por segundo al cargar),
//    cambia solo a modo ligero. Nunca pasa en iPhone.
// Para probar a mano: añade ?efectos=ligero o ?efectos=completos a la dirección (se recuerda en ese navegador).

const CLAVE = 'modo-efectos';

const esIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPad con iPadOS

function eleccionManual() {
  try {
    const p = new URLSearchParams(window.location.search).get('efectos');
    if (p === 'ligero' || p === 'completos') localStorage.setItem(CLAVE, p);
    return localStorage.getItem(CLAVE);
  } catch {
    return null;
  }
}

function detectar() {
  try {
    const manual = eleccionManual();
    if (manual) return manual === 'ligero';
    if (esIOS()) return false;
    const tactil = window.matchMedia('(pointer: coarse)').matches;
    const memoria = navigator.deviceMemory; // GB aproximados (Chrome/Android); undefined en otros navegadores
    const nucleos = navigator.hardwareConcurrency || 8;
    if (tactil) return !(memoria >= 8); // Android de gama alta conserva los efectos completos
    return nucleos <= 4 || (memoria !== undefined && memoria <= 4);
  } catch {
    return false;
  }
}

export const MODO_LIGERO = typeof window !== 'undefined' && detectar();

export const esLigero = () => document.documentElement.classList.contains('ligero');

function pasarALigero() {
  if (esLigero()) return;
  document.documentElement.classList.add('ligero');
  window.dispatchEvent(new Event('modo-ligero'));
}

// Mide la fluidez real unos segundos después de cargar; si va lento, baja los efectos.
function vigilarFluidez() {
  if (esIOS() || eleccionManual() === 'completos') return;
  const medir = () => {
    let cuadros = 0;
    const inicio = performance.now();
    const paso = (t) => {
      cuadros += 1;
      if (t - inicio < 2500) requestAnimationFrame(paso);
      else if ((cuadros * 1000) / (t - inicio) < 40 && !document.hidden) pasarALigero();
    };
    requestAnimationFrame(paso);
  };
  const empezar = () => setTimeout(() => { if (!document.hidden) medir(); }, 2000);
  if (document.readyState === 'complete') empezar();
  else window.addEventListener('load', empezar, { once: true });
}

export function activarModoLigero() {
  if (MODO_LIGERO) document.documentElement.classList.add('ligero');
  else vigilarFluidez();
}
