// Íconos de redes sociales (Font Awesome, licencia libre) que se pintan del color de la marca al pasar el cursor.
import { faLinkedinIn, faGithub, faWhatsapp, faInstagram, faFacebookF, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ICONOS = { linkedin: faLinkedinIn, github: faGithub, whatsapp: faWhatsapp, instagram: faInstagram, facebook: faFacebookF, telegram: faTelegram, tiktok: faTiktok, gmail: faEnvelope };

export function Icono({ nombre, className = 'h-5 w-5' }) {
  const ic = ICONOS[nombre];
  if (!ic) return null;
  const [w, h, , , path] = ic.icon;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} fill="currentColor" aria-hidden>
      <path d={Array.isArray(path) ? path.join(' ') : path} />
    </svg>
  );
}

// Botón cuadrado de red social. Si no hay url, se colorea pero no navega.
export default function SocialIcon({ red, tamano = 'h-12 w-12' }) {
  const estilo = { '--marca': red.color };
  const clase = `red-social grid ${tamano} place-items-center rounded-2xl border border-white/15 text-white/80`;
  const contenido = (
    <>
      <Icono nombre={red.icono} />
      <span className="sr-only">{red.nombre}{!red.url && ' (próximamente)'}</span>
    </>
  );
  if (!red.url) return <span className={`${clase} cursor-default`} style={estilo} title={`${red.nombre} · próximamente`}>{contenido}</span>;
  const externo = red.url.startsWith('http');
  return (
    <a href={red.url} className={clase} style={estilo} title={red.nombre} {...(externo ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {contenido}
    </a>
  );
}
