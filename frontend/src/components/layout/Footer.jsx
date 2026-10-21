// Pie de página: barra de colores, frases, redes con su color y enlaces legales.
import { Link } from 'react-router-dom';
import { perfil, redes } from '../../data/content';
import SocialIcon from '../ui/SocialIcon';
import Typewriter from '../effects/Typewriter';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10">
      <div className="barra-arcoiris w-full" />
      <div className="contenedor py-12 text-center">
        <p className="mx-auto min-h-[2em] max-w-2xl text-lg italic text-violeta-claro md:text-xl">
          <Typewriter frases={perfil.frasesPie} velocidad={46} pausa={2600} />
        </p>
        <div className="fila-redes mx-auto mt-8 justify-center">
          {redes.map((r) => <SocialIcon key={r.nombre} red={r} tamano="" />)}
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="contenedor flex flex-col items-center justify-between gap-4 py-6 text-sm text-texto-suave md:flex-row">
          <span>© {new Date().getFullYear()} {perfil.nombre}</span>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2" aria-label="Enlaces legales">
            <Link to="/aviso-legal" className="hover:text-white">Aviso legal</Link>
            <Link to="/terminos" className="hover:text-white">Términos</Link>
            <Link to="/privacidad" className="hover:text-white">Privacidad</Link>
            <Link to="/cookies" className="hover:text-white">Cookies</Link>
            <Link to="/reembolsos" className="hover:text-white">Reembolsos</Link>
          </nav>
          <span className="font-mono text-xs">Hecho con React + Express</span>
        </div>
      </div>
    </footer>
  );
}
