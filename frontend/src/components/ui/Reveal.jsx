import { VISTA, SUAVE } from '../../data/animacion';
// Hace aparecer su contenido (fade + slide) CADA VEZ que entra en pantalla.
import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={VISTA} transition={{ duration: 0.8, delay, ease: SUAVE }}>
      {children}
    </M>
  );
}
