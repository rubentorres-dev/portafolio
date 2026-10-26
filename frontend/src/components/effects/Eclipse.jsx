// Agujero negro con luz que recorre TODA la curva sin parar (inspirado en el video de referencia).
// Versión optimizada: ninguna capa que gira tiene filtros encima, así que la tarjeta gráfica
// solo rota imágenes ya dibujadas (fluido en celulares). Se pausa cuando no está en pantalla.
// Capas, de atrás hacia adelante:
//  1. Halo exterior difuso que gira lento.
//  2. Brillo fijo que "respira".
//  3. Disco negro con neblina azul en la parte baja.
//  4. Anillo fino con zonas brillantes que giran (la luz "corre" por la curva).
//  5. Segundo anillo girando al revés: destellos cuando se cruzan (solo escritorio).
//  6. Dos ondas de luz suaves que giran a distinto ritmo y "respiran": efecto de agua.
//  7. Tres cometas con estela que recorren el borde.
import { useEffect, useRef, useState } from 'react';

export default function Eclipse({ className = '', style }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    const pestaña = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', pestaña);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', pestaña); };
  }, []);

  return (
    <div ref={ref} className={`eclipse-v3 ${visible ? '' : 'eclipse-pausado'} ${className}`} style={style} aria-hidden>
      {/* Halo y brillo quietos (v36): girar/parpadear dos capas tan grandes costaba mucho y casi no se notaba */}
      <div className="ev-halo" />
      <div className="ev-glow-fijo" />
      <div className="ev-disco" />
      <div className="ev-borde ev-gira" />
      <div className="ev-agua ev-agua-1" />
      <div className="ev-agua ev-agua-2" />
      <div className="ev-borde-2 ev-gira-inverso" />
      <div className="ev-cometa ev-gira-cometa" />
      <div className="ev-cometa ev-gira-cometa" style={{ animationDelay: '-2.3s' }} />
      <div className="ev-cometa ev-cometa-3 ev-gira-cometa" style={{ animationDelay: '-4.6s' }} />
    </div>
  );
}
