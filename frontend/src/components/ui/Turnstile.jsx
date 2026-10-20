// Verificación anti-bots de Cloudflare Turnstile (gratis, sin acertijos).
// Si no hay VITE_TURNSTILE_SITE_KEY en el .env, no se muestra (útil en desarrollo).
import { useEffect, useRef } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;
const SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function cargarScript() {
  if (window.turnstile) return Promise.resolve();
  if (!window.__turnstilePromesa) {
    window.__turnstilePromesa = new Promise((ok, mal) => {
      const s = document.createElement('script');
      s.src = SCRIPT; s.async = true; s.onload = ok; s.onerror = mal;
      document.head.appendChild(s);
    });
  }
  return window.__turnstilePromesa;
}

export const turnstileActivo = Boolean(SITE_KEY);

export default function Turnstile({ onToken, reinicio }) {
  const caja = useRef(null);
  const id = useRef(null);

  useEffect(() => {
    if (!SITE_KEY) return undefined;
    let vivo = true;
    cargarScript().then(() => {
      if (!vivo || !caja.current) return;
      id.current = window.turnstile.render(caja.current, {
        sitekey: SITE_KEY, theme: 'dark', language: 'es',
        callback: onToken, 'expired-callback': () => onToken(''), 'error-callback': () => onToken(''),
      });
    }).catch(() => onToken(''));
    return () => { vivo = false; if (id.current && window.turnstile) window.turnstile.remove(id.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { if (reinicio && id.current && window.turnstile) window.turnstile.reset(id.current); }, [reinicio]);

  if (!SITE_KEY) return null;
  return <div ref={caja} className="mb-4 flex justify-center" />;
}
