// Página de agradecimiento tras enviar el formulario (sirve también para medir conversiones).
// Eclipse total: la luz sale de detrás del disco, se vuelve más fuerte y luego "respira".
// Todo el contenido (ícono, título, texto y botones) queda dentro del disco.
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Icono } from '../components/ui/SocialIcon';
import { enlaceWhatsApp, enlaceTelegram } from '../sections/Contact';
import useSeo from '../hooks/useSeo';

export default function Gracias() {
  useSeo({ titulo: '¡Gracias por escribir!', noindex: true });
  return (
    <section className="relative grid min-h-svh grid-cols-[minmax(0,1fr)] items-center overflow-hidden px-4 pb-6 pt-24 text-center">
      <div className="total">
        <div className="total-fondo" aria-hidden />
        <div className="total-rayos" aria-hidden />
        <div className="total-corona" aria-hidden />
        <div className="total-borde" aria-hidden />
        <div className="total-disco" aria-hidden />

        <motion.div className="total-contenido" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.6 }}>
          <motion.div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-3xl text-emerald-300 md:h-20 md:w-20 md:text-4xl"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 1 }}>✓</motion.div>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:mt-8 md:text-6xl">¡Mensaje <span className="degradado">enviado!</span></h1>
          <p className="subtexto mx-auto mt-4 max-w-[19rem] md:mt-5 md:max-w-md">Gracias por escribirme. Te responderé en menos de 24 horas. Si es urgente, escríbeme por WhatsApp o Telegram.</p>
          <div className="mx-auto mt-7 flex max-w-[22rem] flex-wrap items-center justify-center gap-3 md:mt-8 md:max-w-none">
            <Button to="/">Volver al inicio</Button>
            <a href={enlaceWhatsApp} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><Icono nombre="whatsapp" /> WhatsApp</a>
            <a href={enlaceTelegram} target="_blank" rel="noreferrer" className="btn btn-telegram"><Icono nombre="telegram" /> Telegram</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
