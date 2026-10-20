// SOBRE MÍ: al llegar a la sección, la media luna de luz y el texto se animan SOLOS (como el video).
// No hace falta seguir bajando: con estar en la sección basta. Se repite cada vez que vuelves.
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { perfil } from '../data/content';
import LunaEclipse from '../components/effects/LunaEclipse';
import { prefiereMenosMovimiento } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const raiz = useRef(null);

  useLayoutEffect(() => {
    if (prefiereMenosMovimiento()) return undefined;
    const ctx = gsap.context(() => {
      // Secuencia del video: oscuridad → nace la línea de luz → crece la media luna → entra el texto → luz cálida
      const tl = gsap.timeline({ paused: true })
        .set('.ab-luna', { '--p': 0, '--tibio': 0 })
        .set('.ab-txt', { opacity: 0, y: 40 })
        .to('.ab-luna', { '--p': 0.12, duration: 0.6, ease: 'power1.out' }, 0.2)
        .to('.ab-luna', { '--p': 1, duration: 1.6, ease: 'power2.inOut' })
        .to('.ab-txt', { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=1.1')
        .to('.ab-luna', { '--tibio': 0.35, '--p': 0.85, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1 }, '+=0.4'); // la luz sigue "respirando"

      ScrollTrigger.create({
        trigger: raiz.current,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => tl.pause(0),
        onLeaveBack: () => tl.pause(0),
      });
    }, raiz);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sobre-mi" ref={raiz} className="relative">
      <div className="flex min-h-[100svh] items-center overflow-hidden pb-10 pt-24">
        <div className="contenedor grid items-center gap-16 md:grid-cols-2">
          <div className="relative mx-auto w-64 md:w-[min(380px,44svh)]">
            <LunaEclipse className="ab-luna w-full" imagen="/img/avatar.webp" alt={`Avatar de ${perfil.nombre}`} />
          </div>
          <div className="relative">
            <p className="ab-txt etiqueta">Sobre mí</p>
            <h2 className="ab-txt mt-3 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">Código limpio.<br /><span className="degradado">Sistemas reales.</span></h2>
            {perfil.bio.map((p, i) => <p key={i} className="ab-txt subtexto mt-3 !text-[15px] xl:!text-base">{p}</p>)}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {perfil.datos.map((d, i) => (
                <div key={d.texto} className="ab-txt tech-tile rounded-tarjeta border border-white/10 bg-white/[0.03] p-4"
                  style={{ '--neon': ['#A78BFA', '#22D3EE', '#34D399'][i % 3] }}>
                  <b className="dato-valor block text-2xl transition md:text-3xl">{d.valor}</b>
                  <small className="text-xs text-texto-suave md:text-sm">{d.texto}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
