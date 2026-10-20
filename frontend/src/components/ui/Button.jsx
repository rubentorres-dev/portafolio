// Botón tipo píldora con efecto magnético y onda al hacer clic.
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Button({ variante = 'principal', href, to, onClick, children, className = '', type = 'button', disabled, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });
  const [ondas, setOndas] = useState([]);

  const mover = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const salir = () => { x.set(0); y.set(0); };
  const click = (e) => {
    const r = ref.current.getBoundingClientRect();
    const id = Date.now();
    setOndas((o) => [...o, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setOndas((o) => o.filter((w) => w.id !== id)), 650);
    onClick?.(e);
  };

  const clase = `${variante === 'principal' ? 'btn-principal' : 'btn-secundario'} ${disabled ? 'opacity-60 pointer-events-none' : ''} ${className}`;
  const contenido = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      {ondas.map((o) => (
        <motion.span key={o.id} className="pointer-events-none absolute rounded-full bg-violeta/40"
          style={{ left: o.x, top: o.y, width: 12, height: 12, marginLeft: -6, marginTop: -6 }}
          initial={{ scale: 0, opacity: 0.8 }} animate={{ scale: 18, opacity: 0 }} transition={{ duration: 0.6 }} />
      ))}
    </>
  );

  const props = { ref, onMouseMove: mover, onMouseLeave: salir, onClick: click, className: clase, style: { x: sx, y: sy }, ...rest };
  if (to) return <motion.div style={{ x: sx, y: sy, display: 'inline-block' }} ref={ref} onMouseMove={mover} onMouseLeave={salir}><Link to={to} className={clase} onClick={click}>{contenido}</Link></motion.div>;
  if (href) return <motion.a href={href} {...props}>{contenido}</motion.a>;
  return <motion.button type={type} disabled={disabled} {...props}>{contenido}</motion.button>;
}
