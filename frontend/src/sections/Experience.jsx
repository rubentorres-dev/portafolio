import { experiencia } from '../data/content';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';

export default function Experience() {
  return (
    <section id="experiencia" className="seccion">
      <div className="contenedor">
        <SectionTitle etiqueta="Experiencia" titulo="Mi" resaltado="trayectoria" />
        <ol className="relative mt-14 border-l border-violeta-brillo/25 pl-8 md:ml-4">
          {experiencia.map((e, i) => (
            <Reveal as="li" key={e.cargo} delay={i * 0.1} className="relative mb-12 last:mb-0">
              <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-violeta-brillo bg-noche shadow-[0_0_20px_rgba(167,139,250,.8)]" />
              <p className="font-mono text-xs text-violeta-brillo">{e.periodo}</p>
              <h3 className="mt-1 text-xl font-semibold md:text-2xl">{e.cargo}</h3>
              <p className="text-sm text-white/60">{e.empresa}</p>
              <p className="subtexto mt-3 max-w-2xl !text-base">{e.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
