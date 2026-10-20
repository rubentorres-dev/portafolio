import useSeo from '../hooks/useSeo';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import Button from '../components/ui/Button';
import { estados } from '../data/content';
import NotFound from './NotFound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: p, cargando } = useFetch(() => api.proyecto(slug), [slug]);
  useSeo({ titulo: p?.titulo || 'Proyecto', descripcion: p?.resumen });

  if (cargando) return <div className="contenedor pt-40"><div className="tarjeta h-96 animate-pulse" /></div>;
  if (!p) return <NotFound />;
  const est = estados[p.estado] || estados.en_progreso;

  return (
    <article className="contenedor pb-24 pt-36">
      <Reveal><Link to="/proyectos" className="text-sm text-violeta-claro hover:text-white">← Todos los proyectos</Link></Reveal>
      <Reveal delay={0.1}>
        <p className={`mt-8 font-mono text-xs tracking-widest ${est.color}`}>● {est.texto.toUpperCase()} · NIVEL {p.nivel}</p>
        <h1 className="titulo mt-3">{p.titulo}</h1>
        <p className="subtexto mt-5 max-w-3xl">{p.resumen}</p>
        <div className="mt-6 flex flex-wrap gap-2">{(p.tecnologias || []).map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </Reveal>
      {p.imagen && (
        <Reveal delay={0.2} className="mt-12 overflow-hidden rounded-tarjeta border border-white/10">
          <img src={p.imagen} alt={p.titulo} className="w-full" onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }} />
        </Reveal>
      )}
      <Reveal delay={0.3} className="mt-12 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold">Descripción</h2>
          <p className="subtexto mt-4 whitespace-pre-line">{p.descripcion || p.resumen}</p>
        </div>
        <aside className="tarjeta h-fit space-y-3 p-6">
          {p.repo_url && <Button variante="secundario" href={p.repo_url} target="_blank" rel="noreferrer" className="w-full">Ver repositorio ↗</Button>}
          {p.demo_url && <Button href={p.demo_url} target="_blank" rel="noreferrer" className="w-full">Ver demo ↗</Button>}
          {!p.repo_url && !p.demo_url && <p className="text-sm text-texto-suave">Repositorio y demo disponibles pronto.</p>}
        </aside>
      </Reveal>
    </article>
  );
}
