// Texto que se escribe y borra solo, rotando entre frases.
import { useEffect, useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

export default function Typewriter({ frases, velocidad = 60, pausa = 1600 }) {
  const reducir = useReducedMotion();
  const [i, setI] = useState(0);
  const [texto, setTexto] = useState('');
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    if (reducir) return undefined;
    const actual = frases[i % frases.length];
    let t;
    if (!borrando && texto === actual) t = setTimeout(() => setBorrando(true), pausa);
    else if (borrando && texto === '') { setBorrando(false); setI((n) => n + 1); }
    else t = setTimeout(() => setTexto(actual.slice(0, texto.length + (borrando ? -1 : 1))), borrando ? velocidad / 2 : velocidad);
    return () => clearTimeout(t);
  }, [texto, borrando, i, frases, velocidad, pausa, reducir]);

  if (reducir) return <span>{frases.join(' · ')}</span>;
  return <span>{texto}<span className="cursor-texto text-violeta-brillo">▍</span></span>;
}
