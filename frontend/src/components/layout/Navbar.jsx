// Barra flotante estilo "Liquid Glass" de Apple.
// Una pastilla de vidrio marca la sección actual y sigue al cursor sobre los enlaces.
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { perfil } from '../../data/content';
import { scrollA } from '../../hooks/useLenis';
import useSeccionActiva from '../../hooks/useSeccionActiva';
import Button from '../ui/Button';

const ENLACES = [
  { texto: 'Inicio', id: 'inicio', cubre: ['inicio'] },
  { texto: 'Sobre mí', id: 'sobre-mi', cubre: ['sobre-mi', 'tecnologias', 'experiencia'] },
  { texto: 'Proyectos', id: 'proyectos', cubre: ['proyectos'] },
  { texto: 'Alcance', id: 'alcance', cubre: ['alcance'] },
  { texto: 'Servicios', id: 'servicios', cubre: ['servicios', 'github'] },
  { texto: 'Blog', id: 'blog', ruta: '/blog', cubre: ['blog'] },
  { texto: 'Contacto', id: 'contacto', cubre: ['contacto'] },
];

export default function Navbar() {
  const [compacta, setCompacta] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [hover, setHover] = useState(null);
  const [dedo, setDedo] = useState(null); // sección bajo el dedo mientras se arrastra en el menú del celular
  const arrastre = useRef({ activo: false, movido: false, y: 0 });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const enInicio = pathname === '/';
  const seccion = useSeccionActiva(enInicio);

  useEffect(() => {
    const onScroll = () => setCompacta(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activo = enInicio
    ? ENLACES.find((l) => l.cubre.includes(seccion))?.texto
    : ENLACES.find((l) => l.ruta && pathname.startsWith(l.ruta))?.texto;
  const marcado = hover || activo;

  // Arrastrar el dedo por el menú mueve la pastilla de vidrio; al soltar, va a esa sección.
  const bajoDedo = (e) => document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-enlace]')?.dataset.enlace || null;
  const tocar = (e) => { arrastre.current = { activo: true, movido: false, y: e.clientY }; setDedo(bajoDedo(e)); };
  const moverDedo = (e) => {
    if (!arrastre.current.activo) return;
    if (Math.abs(e.clientY - arrastre.current.y) > 6) arrastre.current.movido = true;
    const t = bajoDedo(e);
    if (t) setDedo(t);
  };
  const soltar = (e) => {
    const { activo, movido } = arrastre.current;
    arrastre.current.activo = false;
    if (!activo || !movido) return setDedo(null); // un toque normal lo maneja el onClick
    const l = ENLACES.find((x) => x.texto === (bajoDedo(e) || dedo));
    setDedo(null);
    if (l) ir(e, l);
  };
  const marcadoMovil = dedo || activo;

  const ir = (e, l) => {
    e.preventDefault?.();
    setAbierto(false);
    if (l.ruta && !enInicio) return navigate(l.ruta);
    if (enInicio) scrollA(`#${l.id}`);
    else navigate(`/#${l.id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`vidrio-liquido flex w-full items-center justify-between rounded-full transition-all duration-500 ${compacta ? 'max-w-4xl py-1.5 pl-5 pr-1.5' : 'max-w-6xl py-2.5 pl-7 pr-2.5'}`}>
        <Link to="/" onClick={(e) => ir(e, ENLACES[0])} className="text-sm font-extrabold tracking-[0.35em]">
          RT<span className="text-violeta-brillo">.</span>DEV
        </Link>

        <ul className="hidden items-center text-sm md:flex" onMouseLeave={() => setHover(null)}>
          {ENLACES.map((l) => (
            <li key={l.texto} className="relative" onMouseEnter={() => setHover(l.texto)}>
              {marcado === l.texto && (
                <motion.span layoutId="pastilla" className="pastilla-vidrio absolute inset-0 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <a href={l.ruta || `/#${l.id}`} onClick={(e) => ir(e, l)}
                className={`relative z-10 block rounded-full px-4 py-2 transition-colors ${marcado === l.texto ? 'text-white' : 'text-white/65 hover:text-white'}`}>
                {l.texto}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {perfil.cvUrl
            ? <Button href={perfil.cvUrl} download className="hidden !px-5 !py-2.5 md:inline-flex">Descargar CV</Button>
            : <Button onClick={(e) => ir(e, ENLACES.find((l) => l.id === 'contacto'))} className="hidden !px-5 !py-2.5 md:inline-flex">Hablemos</Button>}
          <button aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={abierto} onClick={() => setAbierto((v) => !v)}
            className={`boton-vidrio md:hidden ${abierto ? 'abierto' : ''}`}>
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {abierto && (
          <motion.ul initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="vidrio-liquido menu-vidrio menu-arrastre absolute inset-x-4 top-20 flex origin-top-right flex-col gap-1 rounded-3xl p-3 md:hidden"
            onPointerDown={tocar} onPointerMove={moverDedo} onPointerUp={soltar} onPointerCancel={() => { arrastre.current.activo = false; setDedo(null); }}>
            {ENLACES.map((l) => (
              <li key={l.texto} className="relative" data-enlace={l.texto}>
                {marcadoMovil === l.texto && (
                  <motion.span layoutId="pastilla-movil" className="pastilla-vidrio absolute inset-0 rounded-2xl"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                )}
                <a href={l.ruta || `/#${l.id}`} onClick={(e) => ir(e, l)} draggable={false}
                  className={`block rounded-2xl px-4 py-3 transition-colors ${marcadoMovil === l.texto ? 'text-white' : 'text-white/70'}`}>{l.texto}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
