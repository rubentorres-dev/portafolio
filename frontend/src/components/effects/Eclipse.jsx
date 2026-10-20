// Agujero negro con luz que recorre TODA la curva sin parar (inspirado en el video de referencia).
// Capas, de atrás hacia adelante:
//  1. Halo exterior difuso que gira lento.
//  2. Disco negro con neblina azul en la parte baja.
//  3. Anillo fino casi blanco con zonas brillantes que giran (la luz "corre" por la curva).
//  4. Segundo anillo girando al revés: crea destellos cuando se cruzan.
//  5. Tres cometas con estela que recorren el borde.
export default function Eclipse({ className = '', style }) {
  return (
    <div className={`eclipse-v3 ${className}`} style={style} aria-hidden>
      <div className="ev-halo-blur"><div className="ev-halo ev-gira-lento" /></div>
      <div className="ev-glow-fijo ev-parpadeo" />
      <div className="ev-disco" />
      <div className="ev-bordes">
        <div className="ev-borde ev-gira" />
        <div className="ev-borde ev-borde-2 ev-gira-inverso" />
      </div>
      <div className="ev-cometa-blur">
        <div className="ev-cometa ev-gira-cometa" />
        <div className="ev-cometa ev-gira-cometa" style={{ animationDelay: '-2.3s' }} />
        <div className="ev-cometa ev-gira-cometa" style={{ animationDelay: '-4.6s' }} />
      </div>
    </div>
  );
}
