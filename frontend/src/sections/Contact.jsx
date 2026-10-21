// CONTACTO: formulario validado + verificación anti-bots + WhatsApp + Telegram + redes.
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { perfil, redes } from '../data/content';
import { api } from '../services/api';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SocialIcon, { Icono } from '../components/ui/SocialIcon';
import Turnstile, { turnstileActivo } from '../components/ui/Turnstile';
import { VERSION_LEGAL } from '../data/legal';

const VACIO = { nombre: '', correo: '', asunto: '', mensaje: '', sitio_web: '', aceptaTerminos: false, aceptaPrivacidad: false };

export function validar(f) {
  const e = {};
  if (f.nombre.trim().length < 2) e.nombre = 'Escribe tu nombre';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo.trim())) e.correo = 'Correo no válido';
  if (f.mensaje.trim().length < 10) e.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  if (!f.aceptaTerminos) e.aceptaTerminos = 'Debes aceptar los términos y condiciones';
  if (!f.aceptaPrivacidad) e.aceptaPrivacidad = 'Debes autorizar el tratamiento de tus datos';
  return e;
}

export const enlaceTelegram = `https://t.me/${perfil.telegram}`;
export const enlaceWhatsApp = `https://wa.me/${perfil.whatsapp}?text=${encodeURIComponent('Hola Rubén, vi tu portafolio y me gustaría hablar contigo.')}`;

export default function Contact({ asuntoInicial = '' }) {
  const [form, setForm] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState('inicial'); // inicial | enviando | error
  const [aviso, setAviso] = useState('');
  const [token, setToken] = useState('');
  const [reinicio, setReinicio] = useState(0);
  const navigate = useNavigate();

  useEffect(() => { if (asuntoInicial) setForm((f) => ({ ...f, asunto: asuntoInicial })); }, [asuntoInicial]);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length) return;
    if (turnstileActivo && !token) { setEstado('error'); setAviso('Completa la verificación de seguridad'); return; }
    setEstado('enviando');
    try {
      // Se envía la versión de los documentos que la persona vio y aceptó (queda registrada en el servidor).
      await api.contacto({ ...form, acepta: true, versionLegal: VERSION_LEGAL, turnstile_token: token });
      setForm(VACIO);
      navigate('/gracias');
    } catch (err) {
      setAviso(err.message);
      if (err.errores) setErrores(Object.fromEntries(err.errores.map((x) => [x.campo, x.mensaje])));
      setEstado('error');
      setReinicio((n) => n + 1);
    }
  };

  return (
    <section id="contacto" className="seccion" style={{ background: 'radial-gradient(900px 500px at 75% 40%, #1a1460 0%, transparent 65%)' }}>
      <div className="contenedor grid gap-14 lg:grid-cols-2">
        <div>
          <Reveal><p className="etiqueta">Contacto</p></Reveal>
          <Reveal delay={0.1}><h2 className="titulo mt-4">Hablemos de tu <span className="degradado">próximo proyecto</span></h2></Reveal>
          <Reveal delay={0.2}><p className="subtexto mt-6">Disponible para trabajo remoto, prácticas y proyectos freelance. Respondo en menos de 24 horas.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 grid w-fit max-w-full gap-3 sm:grid-cols-2">
              <a href={enlaceWhatsApp} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
                <Icono nombre="whatsapp" className="h-5 w-5" /> Escríbeme por WhatsApp
              </a>
              <a href={enlaceTelegram} target="_blank" rel="noreferrer" className="btn btn-telegram">
                <Icono nombre="telegram" className="h-5 w-5" /> Telegram
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4} className="fila-redes mt-8">
            {redes.map((r) => <SocialIcon key={r.nombre} red={r} tamano="" />)}
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={enviar} noValidate className="vidrio rounded-[30px] p-6 md:p-8">
            {/* Campo trampa: invisible para personas, los bots lo llenan */}
            <input type="text" name="sitio_web" value={form.sitio_web} onChange={cambiar} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <Campo nombre="nombre" etiqueta="Nombre" valor={form.nombre} cambiar={cambiar} error={errores.nombre} auto="name" />
            <Campo nombre="correo" etiqueta="Correo" tipo="email" valor={form.correo} cambiar={cambiar} error={errores.correo} auto="email" />
            <Campo nombre="asunto" etiqueta="Asunto (opcional)" valor={form.asunto} cambiar={cambiar} error={errores.asunto} />
            <Campo nombre="mensaje" etiqueta="Cuéntame sobre tu proyecto" valor={form.mensaje} cambiar={cambiar} error={errores.mensaje} area />
            {/* Dos autorizaciones separadas. Los enlaces abren en otra pestaña para no perder lo escrito. */}
            <label className={`casilla-legal ${errores.aceptaTerminos ? 'casilla-error' : ''}`}>
              <input type="checkbox" name="aceptaTerminos" checked={form.aceptaTerminos} onChange={cambiar} aria-invalid={Boolean(errores.aceptaTerminos)} />
              <span>
                He leído y acepto los{' '}
                <Link to="/terminos" target="_blank" rel="noopener" className="underline hover:text-white">términos y condiciones</Link>.
              </span>
            </label>
            {errores.aceptaTerminos && <p className="-mt-2 mb-3 text-xs text-rose-300">{errores.aceptaTerminos}</p>}
            <label className={`casilla-legal ${errores.aceptaPrivacidad ? 'casilla-error' : ''}`}>
              <input type="checkbox" name="aceptaPrivacidad" checked={form.aceptaPrivacidad} onChange={cambiar} aria-invalid={Boolean(errores.aceptaPrivacidad)} />
              <span>
                Autorizo de forma previa, expresa e informada el tratamiento de mis datos personales para responder mi mensaje,
                según la{' '}
                <Link to="/privacidad" target="_blank" rel="noopener" className="underline hover:text-white">política de privacidad</Link>{' '}
                (Ley 1581 de 2012).
              </span>
            </label>
            {errores.aceptaPrivacidad && <p className="-mt-2 mb-3 text-xs text-rose-300">{errores.aceptaPrivacidad}</p>}
            <Turnstile onToken={setToken} reinicio={reinicio} />
            <Button type="submit" className="mt-2 w-full !py-4" disabled={estado === 'enviando'}>
              {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje →'}
            </Button>
            <AnimatePresence>
              {estado === 'error' && (
                <motion.p role="alert" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-4 text-center text-sm text-rose-300">⚠ {aviso}</motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Campo({ nombre, etiqueta, tipo = 'text', valor, cambiar, error, area, auto }) {
  const props = {
    id: nombre, name: nombre, value: valor, onChange: cambiar, placeholder: ' ', autoComplete: auto || 'off',
    'aria-invalid': Boolean(error), className: `campo ${error ? '!border-rose-400' : ''}`,
  };
  return (
    <motion.div className="campo-flotante mb-4" whileFocus={{ scale: 1.01 }}>
      {area ? <textarea rows={5} {...props} /> : <input type={tipo} {...props} />}
      <label htmlFor={nombre}>{etiqueta}</label>
      {error && <p className="mt-1.5 pl-2 text-xs text-rose-300">{error}</p>}
    </motion.div>
  );
}
