// Globo de puntos 3D (cobe). Encima, un lienzo 2D pinta en blanco los puntos
// de los 21 países hispanohablantes y, al pasar el cursor, muestra nombre y bandera.
// Se puede arrastrar con el mouse (o el dedo) hacia la derecha o la izquierda.
import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import useReducedMotion from '../../hooks/useReducedMotion';
import datos from '../../data/paisesGlobo.json';

const THETA = 0.25;
const VEL = 0.0035;
const RAD = Math.PI / 180;

// Mismo sistema de coordenadas que usa cobe internamente.
const aEsfera = (lat, lon) => {
  const a = lat * RAD, b = lon * RAD - Math.PI, c = Math.cos(a);
  return [-c * Math.cos(b), Math.sin(a), c * Math.sin(b)];
};

// Puntos de tierra de cada país + la capital en países muy pequeños.
const PUNTOS = datos.puntos.map(([lat, lon, p]) => ({ v: aEsfera(lat, lon), p }));
datos.paises.forEach((pais, p) => {
  if (datos.puntos.filter((x) => x[2] === p).length < 3) PUNTOS.push({ v: aEsfera(...pais.capital), p, capital: true });
});

export default function Globe({ tamano = 560 }) {
  const ref = useRef(null);
  const capa = useRef(null);
  const caja = useRef(null);
  const hover = useRef(-1);
  const [info, setInfo] = useState(null); // { p, x, y }
  const reducir = useReducedMotion();

  useEffect(() => {
    let phi = 4.6;
    let vel = VEL;
    let brillo = 5;          // brillo del mapa base (baja al enfocar un país)
    let foco = 0;            // 0 = todos los países, 1 = solo el país señalado
    const arrastre = { activo: false, x: 0, inicioX: 0, movido: false, impulso: 0 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = capa.current.getContext('2d');
    const proyectados = new Float32Array(PUNTOS.length * 3);

    // Puntos pre-dibujados con su brillo (antes se calculaba un "shadowBlur" por punto en cada cuadro).
    const sprite = (color, glow, blur) => {
      const s = 32, c = document.createElement('canvas');
      c.width = c.height = s;
      const g = c.getContext('2d');
      g.shadowColor = glow; g.shadowBlur = blur; g.fillStyle = color;
      g.beginPath(); g.arc(s / 2, s / 2, 4, 0, Math.PI * 2); g.fill();
      return c;
    };
    const PUNTO_NORMAL = sprite('#ffffff', 'rgba(255,255,255,.55)', 6);
    const PUNTO_ACTIVO = sprite('#d8ccff', 'rgba(167,139,250,.95)', 12);

    const dibujar = () => {
      const lado = capa.current.clientWidth;
      if (capa.current.width !== Math.round(lado * dpr)) {
        capa.current.width = Math.round(lado * dpr);
        capa.current.height = Math.round(lado * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, lado, lado);
      const cf = Math.cos(phi), sf = Math.sin(phi), ct = Math.cos(THETA), st = Math.sin(THETA);
      const r = lado * 0.4; // cobe dibuja la esfera con radio 0.8 sobre [-1, 1]
      const punto = Math.max(1, lado / 330);

      PUNTOS.forEach(({ v: [x, y, z], p, capital }, i) => {
        const fx = cf * x + sf * z;
        const fy = sf * st * x + ct * y - cf * st * z;
        const fz = -sf * ct * x + st * y + cf * ct * z;
        const px = lado / 2 + fx * r, py = lado / 2 - fy * r;
        proyectados[i * 3] = px; proyectados[i * 3 + 1] = py; proyectados[i * 3 + 2] = fz;
        if (fz <= 0.05) return;
        const activo = hover.current === p;
        const alfa = activo ? 1 : 1 - foco; // los demás se ocultan con suavidad
        if (alfa <= 0.01) return;
        ctx.globalAlpha = Math.min(1, fz * 1.6) * alfa;
        // El sprite mide 32 px con un punto de radio 4 → escala = radio deseado / 4
        const t = ((capital ? 1.6 : 1) * punto * (activo ? 1.35 : 1) / 4) * 32;
        ctx.drawImage(activo ? PUNTO_ACTIVO : PUNTO_NORMAL, px - t / 2, py - t / 2, t, t);
      });
      ctx.globalAlpha = 1;
    };

    const globe = createGlobe(ref.current, {
      devicePixelRatio: dpr,
      width: tamano * dpr,
      height: tamano * dpr,
      phi,
      theta: THETA,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.32, 0.3, 0.75],
      markerColor: [0.66, 0.55, 1],
      glowColor: [0.3, 0.25, 0.9],
      markers: [{ location: [10.96, -74.78], size: 0.07 }], // Barranquilla
      onRender: (state) => {
        if (arrastre.activo) {
          vel = 0;
        } else if (Math.abs(arrastre.impulso) > 0.0004) {
          // Inercia al soltar: sigue girando y se frena poco a poco.
          phi += arrastre.impulso;
          arrastre.impulso *= 0.94;
        } else {
          // Se frena con suavidad mientras el cursor está sobre un país.
          const meta = reducir || hover.current >= 0 ? 0 : VEL;
          vel += (meta - vel) * 0.08;
          phi += vel;
        }
        const enfocado = hover.current >= 0;
        foco += ((enfocado ? 1 : 0) - foco) * 0.15;
        brillo += ((enfocado ? 1.6 : 5) - brillo) * 0.15;
        state.phi = phi;
        state.mapBrightness = brillo;
        dibujar();
      },
    });

    // Busca el punto visible más cercano al cursor.
    const buscar = (e) => {
      const rect = capa.current.getBoundingClientRect();
      const mx = e.clientX - rect.left, my = e.clientY - rect.top;
      const umbral = Math.max(9, rect.width / 40);
      let mejor = -1, dist = umbral * umbral;
      for (let i = 0; i < PUNTOS.length; i++) {
        if (proyectados[i * 3 + 2] <= 0.05) continue;
        const dx = proyectados[i * 3] - mx, dy = proyectados[i * 3 + 1] - my;
        const d = dx * dx + dy * dy;
        if (d < dist) { dist = d; mejor = PUNTOS[i].p; }
      }
      hover.current = mejor;
      const cajaRect = caja.current.getBoundingClientRect();
      setInfo(mejor >= 0 ? { p: mejor, x: e.clientX - cajaRect.left, y: e.clientY - cajaRect.top } : null);
    };
    const salir = () => { if (!arrastre.activo) { hover.current = -1; setInfo(null); } };
    const el = capa.current;

    const bajar = (e) => {
      arrastre.activo = true;
      arrastre.x = arrastre.inicioX = e.clientX;
      arrastre.movido = false;
      arrastre.impulso = 0;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    const mover = (e) => {
      if (!arrastre.activo) return buscar(e);
      const dx = e.clientX - arrastre.x;
      arrastre.x = e.clientX;
      if (Math.abs(e.clientX - arrastre.inicioX) > 4 && !arrastre.movido) {
        arrastre.movido = true;
        hover.current = -1;
        setInfo(null);
      }
      if (!arrastre.movido) return;
      // Media vuelta por cada ancho del globo arrastrado.
      const giro = (dx / el.clientWidth) * Math.PI;
      phi += giro;
      arrastre.impulso = giro;
    };
    const soltar = (e) => {
      if (!arrastre.activo) return;
      arrastre.activo = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = '';
      if (!arrastre.movido) buscar(e); // un toque sin arrastrar muestra el país
    };

    el.addEventListener('pointerdown', bajar);
    el.addEventListener('pointermove', mover);
    el.addEventListener('pointerup', soltar);
    el.addEventListener('pointercancel', soltar);
    el.addEventListener('pointerleave', salir);
    // Solo se dibuja mientras el globo está en pantalla (ahorra batería y libera la GPU para el resto).
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => globe.toggle(e.isIntersecting && !document.hidden), { rootMargin: '150px' })
      : null;
    io?.observe(caja.current);

    return () => {
      io?.disconnect();
      globe.destroy();
      el.removeEventListener('pointerdown', bajar);
      el.removeEventListener('pointermove', mover);
      el.removeEventListener('pointerup', soltar);
      el.removeEventListener('pointercancel', soltar);
      el.removeEventListener('pointerleave', salir);
    };
  }, [tamano, reducir]);

  const pais = info ? datos.paises[info.p] : null;

  return (
    <div ref={caja} className="relative" style={{ width: tamano, maxWidth: '100%', aspectRatio: '1' }}>
      <canvas ref={ref} aria-hidden="true" style={{ width: '100%', height: '100%' }} />
      <canvas
        ref={capa}
        role="img"
        aria-label={`Globo con los países hispanohablantes: ${datos.paises.map((p) => p.nombre).join(', ')}`}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', cursor: pais ? 'pointer' : 'grab', touchAction: 'pan-y' }}
      />
      {pais && (
        <div
          className="globo-tip pointer-events-none absolute z-10"
          style={{ left: info.x, top: info.y }}
        >
          <img src={`/flags/${pais.codigo}.svg`} alt="" width="28" height="21" />
          <span>{pais.nombre}</span>
        </div>
      )}
    </div>
  );
}
