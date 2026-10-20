import { VISTA } from '../data/animacion';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import SectionTitle from '../components/ui/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/ui/Button';

const FILTROS = [['Todos', '#A78BFA'], ['Java', '#ED8B00'], ['PHP', '#777BB4'], ['JavaScript', '#F7DF1E'], ['Python', '#3776AB'], ['n8n', '#EA4B71'], ['ESP32', '#E7352C']];

export default function FeaturedProjects({ todos = false }) {
  const { data: proyectos, cargando } = useFetch(() => api.proyectos(), []);
  const [filtro, setFiltro] = useState('Todos');

  const lista = useMemo(() => {
    let l = proyectos || [];
    if (!todos) l = l.filter((p) => p.destacado);
    if (filtro !== 'Todos') l = l.filter((p) => (p.tecnologias || []).some((t) => t.toLowerCase() === filtro.toLowerCase()));
    return l;
  }, [proyectos, filtro, todos]);

  return (
    <section id="proyectos" className="seccion">
      <div className="contenedor">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionTitle etiqueta="Proyectos" titulo="Lo que he" resaltado="construido" />
          <div className="flex flex-wrap gap-2">
            {FILTROS.map(([f, color]) => (
              <button key={f} onClick={() => setFiltro(f)} style={{ '--neon': color }}
                className={`filtro-neon rounded-full border px-4 py-2 text-sm ${filtro === f ? 'border-white bg-white !text-noche' : 'border-white/15 text-white/70'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <div className="mt-12 grid gap-6 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="tarjeta h-96 animate-pulse" />)}</div>
        ) : (
          <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {lista.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={VISTA} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}>
                  <ProjectCard p={p} destacada={i === 0 && filtro === 'Todos'} />
                </motion.div>
              ))}
            </AnimatePresence>
            {lista.length === 0 && <p className="subtexto col-span-full">Aún no hay proyectos con este filtro. ¡Vienen en camino!</p>}
          </motion.div>
        )}

        {!todos && <div className="mt-12 text-center"><Button variante="secundario" to="/proyectos">Ver todos los proyectos →</Button></div>}
      </div>
    </section>
  );
}
