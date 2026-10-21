// ALCANCE: globo de puntos con cifras alrededor.
import { alcance } from '../data/content';
import Globe from '../components/effects/Globe';
import Counter from '../components/effects/Counter';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';

export default function Reach() {
  return (
    <section id="alcance" className="seccion sin-seleccion overflow-hidden" style={{ background: 'radial-gradient(800px 500px at 50% 60%, #16136b 0%, transparent 70%)' }}>
      <div className="contenedor">
        <SectionTitle etiqueta="Alcance" titulo="Desde Barranquilla," resaltado="para todo el mundo hispano" centrado />
        <div className="relative mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-1 lg:gap-24">
            {alcance.slice(0, 2).map((a, i) => <Dato key={a.texto} a={a} delay={i * 0.15} />)}
          </div>
          <div data-centrar className="mx-auto flex w-full max-w-[520px] justify-center"><Reveal className="w-full"><Globe tamano={520} /></Reveal></div>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-1 lg:gap-24 lg:text-right">
            {alcance.slice(2).map((a, i) => <Dato key={a.texto} a={a} delay={0.3 + i * 0.15} />)}
          </div>
        </div>
        <p className="subtexto mt-8 text-center">Latinoamérica y España · zona horaria GMT-5</p>
      </div>
    </section>
  );
}

function Dato({ a, delay }) {
  return (
    <Reveal delay={delay}>
      <b className="block text-5xl font-semibold tracking-tight md:text-6xl"><Counter valor={a.valor} sufijo={a.sufijo} /></b>
      <small className="mt-1 block text-sm text-texto-suave">{a.texto}</small>
    </Reveal>
  );
}
