// Página de agradecimiento tras enviar el formulario (sirve también para medir conversiones).
// Usa el MISMO agujero negro del inicio (círculo completo con la luz infinita que recorre el borde),
// más pequeño, y todo el contenido queda dentro del disco.
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Eclipse from '../components/effects/Eclipse';
import { Icono } from '../components/ui/SocialIcon';
import { enlaceWhatsApp, enlaceTelegram } from '../sections/Contact';
import useSeo from '../hooks/useSeo';

export default function Gracias() {
  useSeo({ titulo: '¡Gracias por escribir!', noindex: true });
  return (
    <section className="relative grid min-h-svh place-items-center overflow-hidden px-4 pb-8 pt-24 text-center"
      style={{ background: 'radial-gradient(120% 70% at 50% 45%, #0b0b3d 0%, #05051a 70%)' }}>
      <div className="estrellas absolute inset-0" aria-hidden />
      <motion.div className="gracias-agujero relative" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
        <Eclipse className="absolute inset-0" />

        <motion.div className="gracias-contenido" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}>
          <motion.div className="gr-check mx-auto grid place-items-center rounded-full bg-emerald-400/15 text-emerald-300"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 1.1 }}>✓</motion.div>
          <h1 className="gr-titulo font-bold leading-[1.05] tracking-tight">
            ¡Mensaje <span className="degradado">enviado!</span>
          </h1>
          <p className="gr-texto mx-auto leading-relaxed text-texto-suave">
            Gracias por escribirme. Te respondo en menos de 24 horas. Si es urgente, escríbeme por WhatsApp o Telegram.
          </p>
          <div className="gr-botones flex items-center justify-center">
            <Button to="/" className="gr-volver">Volver al inicio</Button>
            <a href={enlaceWhatsApp} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp" title="WhatsApp"
              className="btn btn-whatsapp gr-icono"><Icono nombre="whatsapp" className="h-[45%] w-[45%]" /></a>
            <a href={enlaceTelegram} target="_blank" rel="noreferrer" aria-label="Escribir por Telegram" title="Telegram"
              className="btn btn-telegram gr-icono"><Icono nombre="telegram" className="h-[45%] w-[45%]" /></a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
