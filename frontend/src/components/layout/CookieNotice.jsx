// Aviso de cookies con consentimiento: el visitante puede ACEPTAR o RECHAZAR.
// La elección se guarda en el navegador (localStorage) y no se vuelve a preguntar.
// Cualquier herramienta opcional (analítica, etc.) debe consultar tieneConsentimiento() antes de activarse.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const CLAVE = 'consentimiento-cookies-v2';
const EVENTO = 'cookies:cambio';

export function leerConsentimiento() {
  try { return localStorage.getItem(CLAVE); } catch { return null; } // 'aceptadas' | 'rechazadas' | null
}
export const tieneConsentimiento = () => leerConsentimiento() === 'aceptadas';

// Borra la elección y vuelve a mostrar el aviso (se usa desde la página de cookies).
export function cambiarPreferenciaCookies() {
  try { localStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ }
  window.dispatchEvent(new Event(EVENTO));
}

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t;
    const revisar = (espera) => { clearTimeout(t); if (!leerConsentimiento()) t = setTimeout(() => setVisible(true), espera); };
    revisar(2500);
    const reabrir = () => revisar(0);
    window.addEventListener(EVENTO, reabrir);
    return () => { clearTimeout(t); window.removeEventListener(EVENTO, reabrir); };
  }, []);

  const elegir = (valor) => {
    try { localStorage.setItem(CLAVE, valor); } catch { /* modo privado: se pregunta de nuevo la próxima vez */ }
    setVisible(false);
    window.dispatchEvent(new Event(EVENTO));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div role="dialog" aria-live="polite" aria-label="Aviso de cookies" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          className="vidrio-liquido fixed bottom-4 left-4 right-4 z-[70] mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-3xl p-4 text-sm sm:flex-row">
          <p className="flex-1 text-center text-white/80 sm:text-left">
            🍪 Este sitio usa cookies para recordar tus preferencias y mejorar tu experiencia. ¿Las aceptas?{' '}
            <Link to="/cookies" className="underline hover:text-white">Más información</Link>.
          </p>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => elegir('rechazadas')} className="btn-secundario !px-5 !py-2">Rechazar</button>
            <button onClick={() => elegir('aceptadas')} className="btn-principal !px-5 !py-2">Aceptar</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
