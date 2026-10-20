import Reveal from './Reveal';

// Etiqueta + titular con la segunda parte en degradado.
export default function SectionTitle({ etiqueta, titulo, resaltado, centrado = false, children }) {
  return (
    <Reveal className={centrado ? 'text-center' : ''}>
      <p className="etiqueta">{etiqueta}</p>
      <h2 className="titulo mt-4">
        {titulo} {resaltado && <span className="degradado">{resaltado}</span>}
      </h2>
      {children && <p className={`subtexto mt-5 max-w-2xl ${centrado ? 'mx-auto' : ''}`}>{children}</p>}
    </Reveal>
  );
}
