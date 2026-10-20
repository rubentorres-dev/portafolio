import useSeo from '../hooks/useSeo';
import Button from '../components/ui/Button';
import LunaEclipse from '../components/effects/LunaEclipse';

// 404 minimalista: la media luna hace el ciclo completo del video en bucle.
export default function NotFound() {
  useSeo({ titulo: 'Página no encontrada', noindex: true });
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-28 text-center">
      <div className="relative">
        <LunaEclipse autoplay className="mx-auto w-56 md:w-72">
          <span className="grid h-full w-full place-items-center font-mono text-5xl font-bold text-white/80 md:text-6xl">404</span>
        </LunaEclipse>
        <h1 className="titulo relative mt-14 !text-4xl md:!text-6xl">Te perdiste <span className="degradado">en el espacio</span></h1>
        <p className="subtexto relative mx-auto mt-5 max-w-md">La página que buscas no existe o fue movida.</p>
        <div className="relative mt-8"><Button to="/">Volver al inicio</Button></div>
      </div>
    </section>
  );
}
