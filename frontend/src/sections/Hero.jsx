import { VISTA } from '../data/animacion';
// INICIO: eclipse con luz violeta que revela el nombre. Animado con GSAP + ScrollTrigger.
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { perfil } from '../data/content';
import Button from '../components/ui/Button';
import Typewriter from '../components/effects/Typewriter';
import Eclipse from '../components/effects/Eclipse';
import { scrollA } from '../hooks/useLenis';
import { prefiereMenosMovimiento } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const raiz = useRef(null);

  useLayoutEffect(() => {
    if (prefiereMenosMovimiento()) return undefined;
    const ctx = gsap.context(() => {
      // Entrada: el agujero negro baja un poco y se enciende (como en el video).
      gsap.set('.h-eclipse', { xPercent: -50, x: 0, y: 0 });
      gsap.fromTo('.h-eclipse', { yPercent: -6, scale: 0.92, opacity: 0 }, { yPercent: 0, scale: 1, opacity: 1, duration: 2.2, ease: 'expo.out' });

      // Scroll: valores de inicio y fin EXPLÍCITOS (fromTo) para que al volver arriba
      // todo regrese exactamente a como estaba. scrub suave = sensación tipo Apple.
      const tl = gsap.timeline({ scrollTrigger: { trigger: raiz.current, start: 'top top', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true } });
      tl.fromTo('.h-eclipse', { scale: 1 }, { scale: 1.35, ease: 'none', immediateRender: false }, 0)
        .fromTo('.h-letra-scroll', { y: 0, opacity: 1 }, { y: (i) => (i % 2 ? -40 : 40), opacity: 0, stagger: 0.04, ease: 'none', immediateRender: false }, 0)
        .fromTo('.h-contenido-scroll', { y: 0, opacity: 1 }, { y: -60, opacity: 0, ease: 'none', immediateRender: false }, 0)
        .fromTo('.h-desliza', { opacity: 1 }, { opacity: 0, ease: 'none', duration: 0.3, immediateRender: false }, 0);
    }, raiz);
    return () => ctx.revert();
  }, []);

  // RUBEN - DEV → cada letra se anima por separado; '-' es la línea de luz del medio
  const caracteres = [...perfil.nombreCorto, '-', ...perfil.marca];

  return (
    <section id="inicio" ref={raiz} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: 'radial-gradient(120% 70% at 50% 30%, #0b0b3d 0%, #05051a 70%)' }}>
        <div className="estrellas absolute inset-0" />
        {/* Agujero negro: la luz recorre toda la curva sin parar */}
        {/* Agujero negro como en el video: un círculo enorme cuya mitad inferior cruza
            la pantalla de un lado a otro. La parte de arriba queda fuera de la pantalla. */}
        <div className="h-eclipse hero-anillo absolute left-1/2" style={{ transform: 'translateX(-50%)' }}>
          <Eclipse className="absolute inset-0" />
        </div>

        {/* RUBEN — DEV dentro del agujero negro, en el centro */}
        <div aria-hidden className="hero-nombre absolute inset-x-0 flex items-center justify-center px-4 font-extrabold"
          style={{ fontSize: 'clamp(1.6rem, 4.6vw, 4.5rem)', letterSpacing: '0.3em', paddingLeft: '0.3em' }}>
          {caracteres.map((l, i) => (
            <motion.span key={i} className="inline-block"
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={VISTA}
              transition={{ duration: 1.1, delay: 0.5 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}>
              <span className="h-letra-scroll inline-block will-change-transform">
                {l === '-'
                  ? <span className="separador-luna mx-[0.35em] inline-block align-middle" />
                  : <span className="letra-luna inline-block" style={{ animationDelay: `${i * 0.3}s` }}>{l}</span>}
              </span>
            </motion.span>
          ))}
        </div>

        {/* Frases y botones, también dentro del agujero */}
        <motion.div className="hero-contenido absolute inset-x-0 px-6 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VISTA} transition={{ duration: 1, delay: 1.3 }}>
          <div className="h-contenido-scroll">
            <p className="mb-6 min-h-[1.5em] text-[10px] uppercase tracking-[0.3em] text-violeta-claro sm:text-xs md:text-sm">
              <Typewriter frases={perfil.frases} />
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button onClick={() => scrollA('#proyectos')}>Ver proyectos →</Button>
              <Button variante="secundario" onClick={() => scrollA('#contacto')}>Contactar</Button>
            </div>
          </div>
        </motion.div>

        {/* Fundido inferior: evita el "borde" al pasar a la siguiente sección */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-noche" />

        <motion.div className="h-desliza absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.3em] text-white/40"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>DESLIZA ↓</motion.div>
      </div>
    </section>
  );
}
