import { VISTA, SUAVE } from '../data/animacion';
// TECNOLOGÍAS: todas las del README, con su logo y neón de su color al pasar el cursor.
import { motion } from 'framer-motion';
import { categorias, tecnologias } from '../data/tecnologias';
import SectionTitle from '../components/ui/SectionTitle';

export default function Tech() {
  return (
    <section id="tecnologias" className="seccion">
      <div className="contenedor">
        <SectionTitle etiqueta="Tecnologías" titulo="Mi caja de" resaltado="herramientas" centrado>
          {tecnologias.length} tecnologías entre lenguajes, frameworks, bases de datos y herramientas de mi stack.
        </SectionTitle>

        <div className="mt-14 space-y-10">
          {categorias.map((cat, ci) => (
            <motion.div key={cat} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VISTA}
              transition={{ duration: 0.7, delay: ci * 0.05, ease: [0.22, 1, 0.36, 1] }}>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-violeta-brillo">{cat}</h3>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {tecnologias.filter((t) => t.categoria === cat).map((t, ti) => (
                  <motion.li key={t.nombre} initial={{ opacity: 0, y: 18, scale: 0.94 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={VISTA} transition={{ duration: 0.45, delay: ti * 0.035, ease: SUAVE }}
                    className="tech-tile flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-3"
                    style={{ '--neon': t.color }}>
                    {t.logo
                      ? <img src={t.logo} alt="" loading="lazy" width="28" height="28"
                          className={`h-7 w-7 flex-none object-contain ${t.invertir ? 'invert' : ''} ${t.claro ? 'rounded-full bg-white p-0.5' : ''} ${t.brillo ? 'brightness-[1.8] saturate-150' : ''}`} />
                      : <span className="grid h-7 w-7 flex-none place-items-center rounded-lg text-xs font-bold text-noche" style={{ background: t.color }}>{t.nombre.slice(0, 2)}</span>}
                    <span className="tech-nombre text-sm text-white/80 transition">{t.nombre}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
