// Media luna de luz (eclipse) inspirada en el video de referencia.
// La intensidad se controla con dos variables CSS:
//   --p      (0 a 1): cuánta luz hay → grosor de la media luna, destello y brillo del fondo
//   --tibio  (0 a 1): color de la luz → 0 violeta, 1 blanco cálido/dorado
// Se animan con GSAP (Sobre mí, atado al scroll) o con CSS (404, en bucle).
export default function LunaEclipse({ imagen, alt = '', className = '', autoplay = false, children }) {
  return (
    <div className={`luna ${autoplay ? 'luna-auto' : ''} ${className}`}>
      <div className="luna-fondo" aria-hidden />
      <div className="luna-bloom" aria-hidden />
      <div className="luna-destello" aria-hidden />
      <div className="luna-arco" aria-hidden />
      <div className="luna-disco">
        {imagen && <img src={imagen} alt={alt} loading="lazy" width="440" height="440" />}
        {children}
      </div>
    </div>
  );
}
