// Número que cuenta desde 0 CADA VEZ que aparece en pantalla.
import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

export default function Counter({ valor, sufijo = '', duracion = 1.6 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: false, amount: 0.5 });
  useEffect(() => {
    if (!ref.current) return undefined;
    if (!visible) { ref.current.textContent = 0 + sufijo; return undefined; }
    const c = animate(0, valor, { duration: duracion, ease: 'easeOut', onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + sufijo; } });
    return () => c.stop();
  }, [visible, valor, sufijo, duracion]);
  return <span ref={ref}>0{sufijo}</span>;
}
