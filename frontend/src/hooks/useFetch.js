// Ejecuta una función asíncrona y expone { data, cargando, error }.
import { useEffect, useState } from 'react';

export default function useFetch(fn, deps = []) {
  const [estado, setEstado] = useState({ data: null, cargando: true, error: null });
  useEffect(() => {
    let vivo = true;
    setEstado((e) => ({ ...e, cargando: true, error: null }));
    fn()
      .then((data) => vivo && setEstado({ data, cargando: false, error: null }))
      .catch((error) => vivo && setEstado({ data: null, cargando: false, error }));
    return () => { vivo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return estado;
}
