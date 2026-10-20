import useSeo from '../hooks/useSeo';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import SectionTitle from '../components/ui/SectionTitle';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';

export const fecha = (f) => new Date(f).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function Blog() {
  useSeo({ titulo: 'Blog', descripcion: 'Notas de aprendizaje de Rubén Torres Osorio sobre desarrollo, Docker, n8n y arquitectura.' });
  const { data, cargando } = useFetch(() => api.articulos(), []);
  return (
    <section className="seccion pt-40">
      <div className="contenedor">
        <SectionTitle etiqueta="Blog" titulo="Notas de" resaltado="aprendizaje">Lo que voy aprendiendo mientras construyo mis proyectos.</SectionTitle>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {cargando && [0, 1].map((i) => <div key={i} className="tarjeta h-48 animate-pulse" />)}
          {(data || []).map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.08}>
              <Link to={`/blog/${a.slug}`} className="neon-google block h-full rounded-tarjeta border border-white/10 bg-noche-2 p-7 transition hover:border-transparent">
                <small className="font-mono text-xs text-texto-suave">{fecha(a.fecha)} · {a.minutos_lectura} min</small>
                <h2 className="mt-2 text-2xl font-semibold">{a.titulo}</h2>
                <p className="mt-3 text-texto-suave">{a.resumen}</p>
                <div className="mt-5 flex flex-wrap gap-2">{(a.etiquetas || []).map((t) => <Tag key={t}>{t}</Tag>)}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
