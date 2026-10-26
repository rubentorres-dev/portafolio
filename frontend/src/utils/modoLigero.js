// "Modo ligero" automático: mismo diseño y colores, pero el agujero negro usa menos capas animadas,
// sin la mezcla de luz costosa y sin agrandarse al hacer scroll. Así no se traba en equipos de baja potencia.
//
// Quién lo recibe:
//  - iPhone / iPad: NUNCA (tienen buena tarjeta gráfica: se dejan todos los efectos).
//  - Android y otros táctiles: solo si el equipo es de gama media/baja (menos de 8 GB de RAM,
//    ej. Xiaomi Note 11S) o si el navegador no informa la memoria.
//  - Computadores: solo si tienen 4 núcleos o menos, o poca memoria.
//  - Además, si un equipo con efectos completos va lento o con tirones durante los primeros 20 s
//    (al cargar o haciendo scroll), cambia solo a modo ligero. Nunca pasa en iPhone.
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

// Mide la fluidez real durante los primeros 20 s (al cargar y mientras la persona hace scroll).
// Si en algún tramo de 3 s va a menos de 48 cuadros por segundo, o más del 20 % de los cuadros
// tardan demasiado (tirones), baja los efectos. Nunca en iPhone ni si se eligió ?efectos=completos.
function vigilarFluidez() {
  if (esIOS() || eleccionManual() === 'completos') return;
  const DURACION = 20000;
  const TRAMO = 3000;
  let inicio = 0;
  let tramo = 0;
  let cuadros = 0;
  let lentos = 0;
  let anterior = 0;
  const paso = (t) => {
    if (esLigero()) return;
    if (document.hidden) { anterior = 0; requestAnimationFrame(paso); return; }
    if (!inicio) { inicio = t; tramo = t; anterior = t; requestAnimationFrame(paso); return; }
    if (anterior) { cuadros += 1; if (t - anterior > 34) lentos += 1; }
    anterior = t;
    if (t - tramo >= TRAMO) {
      const fps = (cuadros * 1000) / (t - tramo);
      if (fps < 48 || lentos / Math.max(cuadros, 1) > 0.2) { pasarALigero(); return; }
      tramo = t; cuadros = 0; lentos = 0;
    }
    if (t - inicio < DURACION) requestAnimationFrame(paso);
  };
  const empezar = () => setTimeout(() => requestAnimationFrame(paso), 1500);
  if (document.readyState === 'complete') empezar();
  else window.addEventListener('load', empezar, { once: true });
}

export function activarModoLigero() {
  if (MODO_LIGERO) document.documentElement.classList.add('ligero');
  else vigilarFluidez();
}
