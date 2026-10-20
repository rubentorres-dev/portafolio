// Páginas legales: aviso legal, términos y condiciones, política de privacidad (Ley 1581 de 2012, Colombia) y cookies.
// Revisa y ajusta estos textos; son una base general, no asesoría legal.
import { Link } from 'react-router-dom';
import { perfil } from '../data/content';
import Reveal from '../components/ui/Reveal';
import useSeo from '../hooks/useSeo';

const ACTUALIZADO = '20 de octubre de 2026';

const TEXTOS = {
  'aviso-legal': {
    titulo: 'Aviso legal',
    secciones: [
      ['Titular del sitio', `Este sitio web es el portafolio personal de ${perfil.nombre}, desarrollador de software residente en ${perfil.ciudad}. Contacto: ${perfil.correo}.`],
      ['Objeto', 'El sitio presenta información profesional, proyectos, servicios freelance y un medio de contacto. No vende productos ni procesa pagos.'],
      ['Propiedad intelectual', 'Los textos, diseños y código propios pertenecen a su autor. Los logotipos de tecnologías y redes sociales pertenecen a sus respectivos dueños y se usan solo con fines informativos. El código de los proyectos publicados en GitHub se rige por la licencia indicada en cada repositorio.'],
      ['Responsabilidad', 'La información se ofrece de buena fe y puede cambiar sin previo aviso. Los enlaces a sitios externos (GitHub, LinkedIn, WhatsApp, etc.) se rigen por las condiciones de esos sitios.'],
      ['Legislación', 'Este aviso se rige por las leyes de la República de Colombia.'],
    ],
  },
  privacidad: {
    titulo: 'Política de privacidad',
    secciones: [
      ['Responsable del tratamiento', `${perfil.nombre} · ${perfil.correo} · ${perfil.ciudad}.`],
      ['Datos que se recogen', 'Únicamente los que escribes en el formulario de contacto: nombre, correo electrónico, asunto y mensaje. No se piden datos sensibles.'],
      ['Finalidad', 'Responder tu mensaje y, si corresponde, dar seguimiento a la propuesta de trabajo o proyecto. Los datos no se venden, no se alquilan y no se usan para publicidad.'],
      ['Autorización', 'Para enviar el formulario debes marcar la casilla de aceptación. Esa casilla es tu autorización previa, expresa e informada, conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia. Puedes revocarla cuando quieras escribiendo al correo de contacto.'],
      ['Conservación', 'Los mensajes se guardan mientras sean necesarios para atender tu solicitud y, como máximo, 12 meses.'],
      ['Encargados del tratamiento', 'Para funcionar y para avisarme de tu mensaje, el sitio se apoya en estos proveedores, que solo procesan los datos necesarios para su servicio: alojamiento web (Vercel), servidor (Render) y base de datos (Neon); Cloudflare Turnstile, que bloquea bots con datos técnicos como la dirección IP; Telegram y Whapi.Cloud (WhatsApp), que me envían una notificación con tu nombre, correo, asunto y mensaje; y Gmail, para el aviso por correo.'],
      ['Transferencia internacional', 'Algunos de esos proveedores tienen servidores fuera de Colombia. Al aceptar esta política autorizas que tus datos se procesen allí solo para las finalidades descritas.'],
      ['Seguridad', 'Las conexiones van cifradas (HTTPS), las claves de los servicios se guardan solo en el servidor y los mensajes no se pueden consultar desde el sitio público.'],
      ['Tus derechos', `Puedes conocer, actualizar, rectificar o pedir la eliminación de tus datos escribiendo a ${perfil.correo}. Responderé en un plazo máximo de 15 días hábiles.`],
    ],
  },
  terminos: {
    titulo: 'Términos y condiciones',
    secciones: [
      ['Aceptación', `Al usar este sitio y su formulario de contacto aceptas estos términos. Si no estás de acuerdo, por favor no los uses. El sitio pertenece a ${perfil.nombre} (${perfil.correo}).`],
      ['Uso permitido', 'Puedes navegar, ver los proyectos y contactarme para ofertas de trabajo o proyectos. No está permitido enviar spam, contenido ofensivo o ilegal, intentar dañar o saturar el sitio, ni usar programas automáticos contra el formulario.'],
      ['Información del sitio', 'Los proyectos, servicios y datos de experiencia se muestran con fines informativos y pueden cambiar sin previo aviso. Mostrar un servicio no obliga a prestarlo: cada proyecto se acuerda por separado.'],
      ['Servicios freelance', 'Las cotizaciones, plazos, precios, entregables y formas de pago se acuerdan por escrito para cada proyecto. Lo que se publica en el sitio no constituye una oferta comercial vinculante.'],
      ['Propiedad intelectual', 'El diseño, los textos y el código propio del sitio pertenecen a su autor. El código publicado en GitHub se rige por la licencia de cada repositorio. Las marcas y logotipos de terceros pertenecen a sus dueños.'],
      ['Enlaces externos', 'El sitio enlaza a servicios como WhatsApp, Telegram, GitHub o LinkedIn. Cada uno tiene sus propias condiciones y políticas, de las que este sitio no es responsable.'],
      ['Responsabilidad', 'El sitio se ofrece "tal cual". Se procura que funcione siempre y que la información sea correcta, pero no se garantiza que esté libre de errores o interrupciones.'],
      ['Datos personales', 'El tratamiento de los datos del formulario se explica en la Política de privacidad.'],
      ['Cambios y legislación', 'Estos términos pueden actualizarse; la fecha de la última versión aparece arriba. Se rigen por las leyes de la República de Colombia.'],
    ],
  },
  cookies: {
    titulo: 'Política de cookies',
    secciones: [
      ['¿Usa cookies este sitio?', 'No se usan cookies de publicidad ni de seguimiento. La analítica (si está activa) es anónima y no usa cookies.'],
      ['Almacenamiento local', 'El navegador guarda una única preferencia: que ya cerraste el aviso de cookies. No contiene datos personales.'],
      ['Servicios de terceros', 'Cloudflare Turnstile, que protege el formulario contra bots, puede usar datos técnicos estrictamente necesarios para esa verificación.'],
      ['Cómo borrarlas', 'Puedes borrar los datos del sitio desde la configuración de privacidad de tu navegador en cualquier momento.'],
    ],
  },
};

export default function Legal({ tipo }) {
  const t = TEXTOS[tipo];
  useSeo({ titulo: t.titulo });
  return (
    <article className="contenedor max-w-3xl pb-24 pt-36">
      <Reveal><Link to="/" className="text-sm text-violeta-claro hover:text-white">← Volver al inicio</Link></Reveal>
      <Reveal delay={0.1}>
        <h1 className="mt-8 text-4xl font-bold md:text-5xl">{t.titulo}</h1>
        <p className="mt-3 font-mono text-xs text-texto-suave">Última actualización: {ACTUALIZADO}</p>
      </Reveal>
      <div className="prosa mt-10">
        {t.secciones.map(([h, p]) => (<div key={h}><h2>{h}</h2><p>{p}</p></div>))}
      </div>
    </article>
  );
}
