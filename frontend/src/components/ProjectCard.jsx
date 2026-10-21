// Tarjeta de proyecto con inclinación 3D y borde animado.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from './ui/TiltCard';
import Tag from './ui/Tag';
import { estados } from '../data/content';

export default function ProjectCard({ p, destacada = false }) {
  const est = estados[p.estado] || estados.en_progreso;
  const [imgRota, setImgRota] = useState(false); // si la imagen no carga, se muestra el ícono </>
  return (
    <TiltCard className={`tarjeta-proyecto h-full min-w-0 overflow-hidden rounded-tarjeta borde-animado ${destacada ? 'shadow-[0_30px_80px_rgba(79,70,229,.35)]' : 'shadow-[0_18px_50px_rgba(79,70,229,.18)]'}`}>
      <Link to={`/proyectos/${p.slug}`} className="flex h-full flex-col">
        <div className="relative m-3 aspect-[16/9] overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1e1b4b] to-[#312e81]">
          {p.imagen && !imgRota
            ? <img src={p.imagen} alt={p.titulo} width="1200" height="675" loading="lazy" decoding="async" onError={() => setImgRota(true)} className="absolute inset-0 h-full w-full max-w-full object-cover transition duration-700 group-hover:scale-105" />
            : <div className="grid h-full place-items-center font-mono text-3xl text-violeta-claro">&lt;/&gt;</div>}
        </div>
        <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
          <span className={`font-mono text-xs tracking-widest ${est.color}`}>● {est.texto.toUpperCase()}</span>
          <h3 className="mt-2 text-xl font-semibold md:text-2xl">{p.titulo}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-texto-suave">{p.resumen}</p>
          <div className="mt-4 flex flex-wrap gap-2">{(p.tecnologias || []).map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </div>
      </Link>
    </TiltCard>
  );
}
