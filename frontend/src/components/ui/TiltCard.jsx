// Tarjeta con inclinación 3D y brillo que sigue al cursor.
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

const TACTIL = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function TiltCard({ children, className = '', intensidad = 8 }) {
  // En celulares no hay cursor: tarjeta normal, sin capas 3D (más estable al desplazar).
  if (TACTIL) return <div className={`group relative ${className}`}>{children}</div>;
  return <TiltCardEscritorio className={className} intensidad={intensidad}>{children}</TiltCardEscritorio>;
}

function TiltCardEscritorio({ children, className, intensidad }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [intensidad, -intensidad]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-intensidad, intensidad]), { stiffness: 180, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const brillo = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(167,139,250,0.18), transparent 60%)`;

  const mover = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const salir = () => { px.set(0.5); py.set(0.5); };

  return (
    <motion.div ref={ref} onMouseMove={mover} onMouseLeave={salir}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      whileHover={{ y: -6 }} className={`group relative ${className}`}>
      <motion.div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: brillo }} />
      {children}
    </motion.div>
  );
}
