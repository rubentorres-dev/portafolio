// Devuelve true si el usuario pidió "reducir movimiento" en su sistema.
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function prefiereMenosMovimiento() {
  return typeof window !== 'undefined' && window.matchMedia?.(QUERY).matches;
}

export default function useReducedMotion() {
  const [reducir, setReducir] = useState(prefiereMenosMovimiento);
  useEffect(() => {
    const mq = window.matchMedia?.(QUERY);
    if (!mq) return;
    const onChange = () => setReducir(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reducir;
}
