// Aviso de cookies minimalista. Se guarda en localStorage que ya fue cerrado.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const CLAVE = 'aviso-cookies-v1';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem(CLAVE)) setTimeout(() => setVisible(true), 2500); } catch { /* modo privado */ }
  }, []);
  const cerrar = () => { try { localStorage.setItem(CLAVE, '1'); } catch { /* sin almacenamiento */ } setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div role="dialog" aria-label="Aviso de cookies" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          className="vidrio-liquido fixed bottom-4 left-4 right-4 z-[70] mx-auto flex max-w-xl flex-col items-center gap-3 rounded-3xl p-4 text-sm sm:flex-row">
          <p className="flex-1 text-white/80">🍪 Este sitio no usa cookies de seguimiento. <Link to="/cookies" className="underline">Más información</Link>.</p>
          <button onClick={cerrar} className="btn-principal !px-5 !py-2">Entendido</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
