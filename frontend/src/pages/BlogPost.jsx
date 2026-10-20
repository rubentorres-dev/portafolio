import useSeo from '../hooks/useSeo';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import Reveal from '../components/ui/Reveal';
import NotFound from './NotFound';
import { fecha } from './Blog';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: a, cargando } = useFetch(() => api.articulo(slug), [slug]);
  useSeo({ titulo: a?.titulo || 'Blog', descripcion: a?.resumen });
  if (cargando) return <div className="contenedor pt-40"><div className="tarjeta h-96 animate-pulse" /></div>;
  if (!a) return <NotFound />;

  return (
    <article className="contenedor max-w-3xl pb-24 pt-36">
      <Reveal><Link to="/blog" className="text-sm text-violeta-claro hover:text-white">← Volver al blog</Link></Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 font-mono text-xs text-texto-suave">{fecha(a.fecha)} · {a.minutos_lectura} min de lectura</p>
        <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">{a.titulo}</h1>
      </Reveal>
      <Reveal delay={0.2} className="prosa mt-10">
        <Markdown>{a.contenido_md}</Markdown>
      </Reveal>
    </article>
  );
}
