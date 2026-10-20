import { VISTA } from '../data/animacion';
// ACTIVIDAD EN GITHUB: datos en vivo desde el backend (que consulta la API de GitHub).
import { motion } from 'framer-motion';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import SectionTitle from '../components/ui/SectionTitle';
import Counter from '../components/effects/Counter';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const COLORES = { Java: '#F89820', JavaScript: '#F7DF1E', Python: '#3776AB', PHP: '#777BB4', HTML: '#E34F26', CSS: '#663399', TypeScript: '#3178C6' };

export default function GithubStats() {
  const { data, cargando, error } = useFetch(() => api.github(), []);

  return (
    <section id="github" className="seccion">
      <div className="contenedor">
        <SectionTitle etiqueta="Actividad en vivo" titulo="Código que" resaltado="no se detiene">
          Datos tomados en tiempo real de la API de GitHub.
        </SectionTitle>

        {error && <p className="subtexto mt-10">No pude conectar con GitHub en este momento. Visita mi perfil directamente.</p>}
        {cargando && <div className="mt-12 grid gap-5 md:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="tarjeta h-64 animate-pulse" />)}</div>}

        {data && (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Reveal className="tarjeta p-7">
              <small className="text-texto-suave">Repositorios públicos</small>
              <div className="text-6xl font-bold"><Counter valor={data.repos_publicos} /></div>
              <small className="mt-4 block text-texto-suave">Estrellas recibidas</small>
              <div className="degradado text-6xl font-bold"><Counter valor={data.estrellas} /></div>
            </Reveal>
            <Reveal delay={0.1} className="tarjeta p-7">
              <small className="text-texto-suave">Lenguajes más usados</small>
              <div className="mt-5 space-y-4">
                {data.lenguajes.map((l) => (
                  <div key={l.nombre}>
                    <div className="flex justify-between text-sm"><span>{l.nombre}</span><span>{l.porcentaje}%</span></div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/5">
                      <motion.i className="block h-full rounded-full" style={{ background: COLORES[l.nombre] || '#A78BFA' }}
                        initial={{ width: 0 }} whileInView={{ width: `${l.porcentaje}%` }} viewport={VISTA} transition={{ duration: 1.2, ease: 'easeOut' }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2} className="tarjeta flex flex-col p-7">
              <small className="text-texto-suave">Repositorios recientes</small>
              <ul className="mt-4 flex-1 space-y-3 text-sm">
                {data.recientes.map((r) => (
                  <li key={r.nombre}><a href={r.url} target="_blank" rel="noreferrer" className="flex justify-between gap-3 hover:text-violeta-claro">
                    <span className="truncate">{r.nombre}</span><span className="font-mono text-xs text-texto-suave">{r.lenguaje || '—'}</span></a></li>
                ))}
              </ul>
              <Button variante="secundario" href={data.perfil_url} target="_blank" rel="noreferrer" className="mt-6">Ver perfil en GitHub ↗</Button>
            </Reveal>
          </div>
        )}
        {error && <div className="mt-6"><Button variante="secundario" href="https://github.com/rubentorres-dev" target="_blank" rel="noreferrer">github.com/rubentorres-dev ↗</Button></div>}
      </div>
    </section>
  );
}
