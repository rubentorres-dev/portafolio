import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '../services/api';
import useFetch from '../hooks/useFetch';
import Reveal from '../components/ui/Reveal';

const GRADIENTES = ['from-sky-500 to-indigo-electrico', 'from-pink-500 to-violeta', 'from-orange-400 to-violeta'];

export default function TestimonialsBlog() {
  const { data: testimonios } = useFetch(() => api.testimonios(), []);
  const { data: articulos } = useFetch(() => api.articulos(), []);
  const [i, setI] = useState(0);
  const lista = testimonios || [];

  useEffect(() => {
    if (lista.length < 2) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % lista.length), 6000);
    return () => clearInterval(t);
  }, [lista.length]);

  return (
    <section id="blog" className="seccion">
      <div className="contenedor grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal><p className="etiqueta">Testimonios</p><h2 className="titulo mt-4 !text-5xl">Lo que <span className="degradado">dicen</span></h2></Reveal>
          <div className="relative mt-8 min-h-[260px]">
            {lista.length === 0 ? (
              <Reveal className="neon-google rounded-tarjeta border border-violeta-brillo/20 bg-gradient-to-br from-violeta/20 to-noche p-8">
                <p className="text-lg leading-relaxed text-white/80">Pronto aquí: opiniones reales de docentes, estudiantes y clientes con los que he trabajado.</p>
              </Reveal>
            ) : (
              <AnimatePresence mode="wait">
                <motion.blockquote key={lista[i].id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5 }}
                  className="neon-google rounded-tarjeta border border-violeta-brillo/20 bg-gradient-to-br from-violeta/20 to-noche p-8">
                  <p className="text-xl leading-relaxed">“{lista[i].texto}”</p>
                  <footer className="mt-6 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violeta-brillo to-indigo-electrico font-bold">{lista[i].nombre[0]}</span>
                    <div><b>{lista[i].nombre}</b><br /><small className="text-texto-suave">{lista[i].cargo}</small></div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            )}
            {lista.length > 1 && (
              <div className="mt-5 flex gap-2">
                {lista.map((t, n) => <button key={t.id} aria-label={`Testimonio ${n + 1}`} onClick={() => setI(n)} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-7 bg-violeta-brillo' : 'w-1.5 bg-white/25'}`} />)}
              </div>
            )}
          </div>
        </div>

        <div>
          <Reveal><p className="etiqueta">Blog</p><h2 className="titulo mt-4 !text-5xl">Notas de <span className="degradado">aprendizaje</span></h2></Reveal>
          <div className="mt-8 space-y-4">
            {(articulos || []).slice(0, 3).map((a, n) => (
              <Reveal key={a.slug} delay={n * 0.1}>
                <Link to={`/blog/${a.slug}`} className="neon-google group flex items-center gap-5 rounded-3xl border border-white/10 bg-noche-2 p-4 transition hover:border-transparent">
                  <div className={`h-20 w-28 flex-none rounded-2xl bg-gradient-to-br ${GRADIENTES[n % 3]} transition duration-500 group-hover:scale-105`} />
                  <div>
                    <small className="font-mono text-xs text-texto-suave">{(a.etiquetas?.[0] || 'NOTA').toUpperCase()} · {a.minutos_lectura} MIN</small>
                    <h3 className="mt-1 font-semibold group-hover:text-violeta-claro">{a.titulo}</h3>
                    <p className="text-sm text-texto-suave">{a.resumen}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Link to="/blog" className="inline-block pt-2 text-sm text-violeta-claro hover:text-white">Ver todos los artículos →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
