// Halo violeta que sigue al puntero (solo en escritorio).
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function CursorGlow() {
  const reducir = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const mover = (e) => { x.set(e.clientX - 160); y.set(e.clientY - 160); };
    window.addEventListener('pointermove', mover);
    return () => window.removeEventListener('pointermove', mover);
  }, [x, y]);

  if (reducir) return null;
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-80 w-80 rounded-full md:block"
      style={{ x: sx, y: sy, background: 'radial-gradient(circle, rgba(124,58,237,0.22), transparent 70%)' }} />
  );
}
