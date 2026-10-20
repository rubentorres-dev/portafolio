// Texto que se escribe y borra solo, rotando entre frases.
// Cada letra nueva entra con un fundido corto y el cursor parpadea suave: se ve más fluido.
import { useEffect, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

// Divide en palabras conservando los espacios (para que el texto haga salto de línea normal).
function palabras(texto) {
  const out = [];
  let desde = 0;
  texto.split(/(\s+)/).forEach((t) => { if (t) out.push({ texto: t, desde }); desde += t.length; });
  return out;
}

export default function Typewriter({ frases, velocidad = 42, pausa = 1500 }) {
  const reducir = useReducedMotion();
  const [i, setI] = useState(0);
  const [largo, setLargo] = useState(0);
  const [borrando, setBorrando] = useState(false);
  const actual = frases[i % frases.length];

  useEffect(() => {
    if (reducir) return undefined;
    let t;
    if (!borrando && largo === actual.length) t = setTimeout(() => setBorrando(true), pausa);
    else if (borrando && largo === 0) t = setTimeout(() => { setBorrando(false); setI((n) => n + 1); }, 180);
    // Al borrar va más rápido y acelera un poco (como al mantener la tecla).
    else t = setTimeout(() => setLargo((n) => n + (borrando ? -1 : 1)), borrando ? Math.max(12, velocidad / 2.6) : velocidad + Math.random() * 22);
    return () => clearTimeout(t);
  }, [largo, borrando, actual, velocidad, pausa, reducir]);

  if (reducir) return <span>{frases.join(' · ')}</span>;
  return (
    <span aria-label={actual}>
      <span aria-hidden>
        {palabras(actual.slice(0, largo)).map(({ texto, desde }) => (
          // Cada palabra no se parte al cambiar de línea; sus letras entran una a una.
          <span key={`${i}-${desde}`} className="whitespace-nowrap">
            {[...texto].map((c, n) => <span key={n} className="tw-letra">{c}</span>)}
          </span>
        ))}
      </span>
      <span className="cursor-texto text-violeta-brillo" aria-hidden>▍</span>
    </span>
  );
}
