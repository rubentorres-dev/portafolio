import { VISTA } from '../data/animacion';
import { motion } from 'framer-motion';
import { servicios } from '../data/content';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { scrollA } from '../hooks/useLenis';

export default function Services({ onCotizar }) {
  return (
    <section id="servicios" className="seccion">
      <div className="contenedor">
        <SectionTitle etiqueta="Servicios freelance" titulo="¿Tienes un proyecto?" resaltado="Lo construimos." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s, i) => (
            <motion.article key={s.titulo} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={VISTA}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="neon-fijo group relative overflow-hidden rounded-tarjeta border border-white/10 bg-white/[0.03] p-7">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(400px 300px at 30% 0%, rgba(124,58,237,.35), transparent 70%)' }} />
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violeta to-indigo-electrico text-2xl shadow-[0_10px_30px_rgba(124,58,237,.5)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">{s.icono}</div>
              <h3 className="relative mt-6 text-xl font-semibold">{s.titulo}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-texto-suave">{s.texto}</p>
              <ul className="relative mt-5 space-y-2 text-sm text-white/80">
                {s.items.map((it) => <li key={it}><span className="text-violeta-brillo">✓</span> {it}</li>)}
              </ul>
              <button onClick={() => { onCotizar?.(s.titulo); scrollA('#contacto'); }} className="relative mt-6 text-sm text-violeta-claro transition hover:text-white">Cotizar este servicio →</button>
            </motion.article>
          ))}
        </div>
        <div className="mt-12 text-center"><Button onClick={() => { onCotizar?.('Cotización'); scrollA('#contacto'); }}>Solicitar cotización →</Button></div>
      </div>
    </section>
  );
}
