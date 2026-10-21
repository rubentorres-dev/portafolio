// Páginas legales: aviso legal, términos, política de datos personales (Ley 1581 de 2012), cookies y reembolsos.
// Revisa y ajusta estos textos; son una base general, no asesoría legal.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cambiarPreferenciaCookies, leerConsentimiento } from '../components/layout/CookieNotice';
import { perfil } from '../data/content';
import Reveal from '../components/ui/Reveal';
import useSeo from '../hooks/useSeo';
import { ACTUALIZADO } from '../data/legal';

const TEL = `+${perfil.whatsapp.slice(0, 2)} ${perfil.whatsapp.slice(2, 5)} ${perfil.whatsapp.slice(5, 8)} ${perfil.whatsapp.slice(8)}`;
const CONTACTO = `${perfil.correo} · WhatsApp ${TEL} · ${perfil.ciudad}`;

// Cada sección: [título, párrafo] o [título, [lista de puntos]].
const TEXTOS = {
  'aviso-legal': {
    titulo: 'Aviso legal',
    secciones: [
      ['Titular del sitio', `Este sitio es el portafolio profesional de ${perfil.nombre}, persona natural, desarrollador de software con domicilio en ${perfil.ciudad}. Contacto: ${CONTACTO}.`],
      ['Objeto', 'El sitio presenta información profesional, proyectos, servicios freelance y medios de contacto. No vende productos en línea, no tiene carrito de compras y no procesa pagos.'],
      ['Propiedad intelectual', 'Los textos, el diseño, el avatar, las capturas de los proyectos y el código propio del sitio pertenecen a su autor. El código de cada proyecto publicado en GitHub se rige por la licencia de su repositorio.'],
      ['Créditos y licencias de terceros', [
        'Logotipos de tecnologías: Devicon (licencia MIT), Simple Icons (licencia CC0) y los logos oficiales que publica cada proyecto. Las marcas pertenecen a sus dueños y se muestran solo para indicar con qué herramientas trabajo (uso nominativo).',
        'Íconos de redes sociales: Font Awesome Free (íconos con licencia CC BY 4.0, Fonticons, Inc.). Las marcas pertenecen a sus dueños.',
        'Banderas: flag-icons (licencia MIT). Mapa de países del globo: Natural Earth (dominio público).',
        'Tipografías: Inter y JetBrains Mono (SIL Open Font License), alojadas en este mismo sitio.',
        'Librerías: React, Framer Motion, GSAP, Lenis y cobe, cada una con su propia licencia de código abierto.',
      ]],
      ['Responsabilidad', 'La información se ofrece de buena fe y puede cambiar sin previo aviso. Los enlaces a sitios externos (GitHub, LinkedIn, WhatsApp, Telegram, Instagram, TikTok, Facebook) se rigen por las condiciones de esos sitios.'],
      ['Documentos relacionados', 'Términos y condiciones, Política de privacidad, Política de cookies y Política de reembolsos, disponibles en el pie de página.'],
      ['Legislación', 'Este sitio se rige por las leyes de la República de Colombia, en especial la Ley 527 de 1999 (comercio electrónico), la Ley 1480 de 2011 (Estatuto del Consumidor) y la Ley 1581 de 2012 (protección de datos personales).'],
    ],
  },
  privacidad: {
    titulo: 'Política de tratamiento de datos personales',
    secciones: [
      ['Responsable del tratamiento', `${perfil.nombre}, persona natural, domiciliado en ${perfil.ciudad}. Correo: ${perfil.correo}. WhatsApp: ${TEL}. Él mismo atiende las consultas y reclamos sobre tus datos.`],
      ['Marco legal', 'Esta política cumple la Ley 1581 de 2012 y el Decreto 1377 de 2013, hoy incluido en el Decreto Único 1074 de 2015, de la República de Colombia.'],
      ['Datos que se recogen', 'Solo los que escribes en el formulario de contacto: nombre, correo electrónico, asunto (opcional) y mensaje. No se piden datos sensibles (salud, origen étnico, opiniones políticas, biométricos, etc.) ni datos de pago. Por favor no incluyas datos sensibles en tu mensaje.'],
      ['Finalidad', 'Responder tu mensaje y, si lo solicitas, dar seguimiento a una oferta de trabajo, cotización o proyecto. Tus datos no se venden, no se alquilan, no se comparten con fines comerciales y no se usan para enviarte publicidad.'],
      ['Autorización y prueba', 'Para enviar el formulario debes marcar dos casillas separadas: una para aceptar los Términos y condiciones y otra para autorizar, de forma previa, expresa e informada, el tratamiento de tus datos. Como prueba de esa autorización se guarda un registro con: la fecha y hora en que aceptaste, la versión de los documentos y el texto exacto aceptado, el medio (formulario web), la página desde la que enviaste, la dirección IP y el tipo de navegador. Ese registro solo se usa para demostrar que autorizaste el tratamiento si tú o la Superintendencia de Industria y Comercio (SIC) lo piden.'],
      ['Menores de edad', 'El formulario está dirigido a personas mayores de edad. Si eres menor de 18 años, pide a tu representante legal que se comunique en tu nombre.'],
      ['Tus derechos', [
        'Conocer, actualizar y rectificar tus datos.',
        'Pedir prueba de la autorización que diste.',
        'Ser informado sobre el uso que se les ha dado.',
        'Revocar la autorización y pedir que se eliminen tus datos, cuando no exista un deber legal de conservarlos.',
        'Acceder gratis a tus datos.',
        'Presentar quejas ante la SIC, después de haber hecho tu consulta o reclamo directamente al responsable.',
      ]],
      ['Cómo ejercer tus derechos', `Escribe a ${perfil.correo} con el asunto "Datos personales", indicando tu nombre, el correo que usaste en el formulario y lo que solicitas. Las consultas se responden en máximo 10 días hábiles (prorrogables 5 días hábiles más, avisándote el motivo). Los reclamos (corrección, actualización, eliminación o revocación) se responden en máximo 15 días hábiles (prorrogables 8 días hábiles más). Si el reclamo está incompleto, se te pedirá completarlo dentro de los 5 días siguientes.`],
      ['Encargados del tratamiento', 'Para funcionar y avisarme de tu mensaje, el sitio usa estos proveedores, que solo procesan los datos necesarios para su servicio: Vercel (alojamiento del sitio), Render (servidor), Neon (base de datos), Cloudflare Turnstile (protección contra bots, cuando está activo), Telegram y Whapi.Cloud/WhatsApp (me envían una notificación con tu nombre, correo, asunto y mensaje) y Gmail (aviso por correo).'],
      ['Transferencia internacional', 'Varios de esos proveedores tienen servidores fuera de Colombia (por ejemplo, en Estados Unidos). Al autorizar el tratamiento aceptas que tus datos se procesen allí solo para las finalidades descritas.'],
      ['Conservación', 'Los mensajes se guardan mientras sean necesarios para atender tu solicitud y como máximo 12 meses; después se eliminan. El registro de autorización se conserva mientras existan tus datos y, después, solo el tiempo necesario para atender posibles reclamos o requerimientos de la autoridad (máximo 5 años).'],
      ['Seguridad', 'Las conexiones van cifradas (HTTPS), las claves de los servicios se guardan solo en el servidor, el formulario tiene límites contra abuso y los mensajes no se pueden consultar desde el sitio público.'],
      ['Vigencia y cambios', 'Esta política rige desde la fecha de actualización indicada arriba. Si cambia de forma sustancial, se publicará aquí la nueva versión con su fecha, y las nuevas autorizaciones quedarán ligadas a esa versión.'],
    ],
  },
  terminos: {
    titulo: 'Términos y condiciones',
    secciones: [
      ['Aceptación', `Estos términos regulan el uso de este sitio y de su formulario de contacto. Para enviar el formulario debes aceptarlos marcando la casilla correspondiente. El sitio pertenece a ${perfil.nombre} (${perfil.correo}).`],
      ['Uso permitido', 'Puedes navegar, ver los proyectos y contactarme para ofertas de trabajo o proyectos. No está permitido enviar spam, contenido ofensivo o ilegal, suplantar a otra persona, intentar dañar o saturar el sitio, ni usar programas automáticos contra el formulario.'],
      ['Información del sitio', 'Los proyectos, servicios y datos de experiencia se muestran con fines informativos y pueden cambiar sin previo aviso. Lo publicado no constituye una oferta comercial vinculante: cada proyecto se cotiza y acuerda por separado.'],
      ['Servicios freelance', 'El alcance, precio, plazos, entregables, forma de pago, garantía y soporte de cada servicio se acuerdan por escrito (cotización o contrato) antes de empezar. Las devoluciones se rigen por la Política de reembolsos.'],
      ['Propiedad intelectual', 'El diseño, los textos y el código propio del sitio pertenecen a su autor. El código publicado en GitHub se rige por la licencia de cada repositorio. Las marcas y logotipos de terceros pertenecen a sus dueños (ver Créditos en el Aviso legal).'],
      ['Enlaces externos', 'El sitio enlaza a servicios como WhatsApp, Telegram, GitHub, LinkedIn, Instagram, TikTok o Facebook. Cada uno tiene sus propias condiciones y políticas.'],
      ['Responsabilidad', 'El sitio se ofrece "tal cual". Se procura que funcione siempre y que la información sea correcta, pero no se garantiza que esté libre de errores o interrupciones.'],
      ['Datos personales', 'El tratamiento de los datos del formulario se explica en la Política de tratamiento de datos personales, que se acepta en una casilla aparte.'],
      ['Cambios y legislación', 'Estos términos pueden actualizarse; la fecha de la última versión aparece arriba. Se rigen por las leyes de la República de Colombia.'],
    ],
  },
  cookies: {
    titulo: 'Política de cookies',
    secciones: [
      ['¿Usa cookies este sitio?', 'Este sitio no instala cookies propias de publicidad ni de seguimiento, y no usa herramientas de analítica. Las fuentes tipográficas están alojadas en el propio sitio, así que tu navegador no se conecta a Google para cargarlas.'],
      ['Almacenamiento local (necesario)', 'El navegador guarda en su almacenamiento local solo tu elección sobre este aviso (aceptadas o rechazadas), para no volver a preguntarte. No contiene datos personales y es estrictamente necesario para respetar tu decisión.'],
      ['Tu consentimiento', 'Al entrar por primera vez verás un aviso para Aceptar o Rechazar. Si rechazas, el sitio funciona igual. Si en el futuro se agrega alguna herramienta opcional (por ejemplo, analítica de visitas), solo se activará si aceptas, y esta política se actualizará antes. Puedes cambiar tu decisión cuando quieras con el botón de abajo.'],
      ['Servicios de terceros', 'Cloudflare Turnstile, cuando protege el formulario contra bots, puede usar datos técnicos estrictamente necesarios para esa verificación. Al tocar los enlaces a WhatsApp, Telegram u otras redes sales de este sitio y aplican las cookies y políticas de esos servicios.'],
      ['Cómo borrarlas', 'Puedes borrar los datos de este sitio desde la configuración de privacidad de tu navegador en cualquier momento.'],
    ],
  },
  reembolsos: {
    titulo: 'Política de reembolsos',
    secciones: [
      ['Alcance', 'Este sitio no vende productos ni cobra pagos en línea. Esta política aplica a los servicios freelance (páginas web, sistemas, automatizaciones, soporte) que se contraten después de una cotización aceptada por escrito.'],
      ['Antes de empezar', 'Si cancelas el servicio antes de que empiece el trabajo, se devuelve el 100 % de lo pagado.'],
      ['Derecho de retracto', 'Si eres consumidor y contrataste a distancia (por internet, WhatsApp, etc.), puedes retractarte dentro de los 5 días hábiles siguientes a la contratación, como indica el artículo 47 de la Ley 1480 de 2011, y se te devuelve el dinero pagado. Este derecho no aplica si el trabajo ya empezó con tu acuerdo, ni a servicios hechos a la medida según tus especificaciones, conforme a las excepciones de esa misma ley.'],
      ['Trabajo ya iniciado', 'Si el trabajo ya empezó y decides cancelar, se devuelve la parte del pago que corresponde al trabajo que aún no se ha hecho, según las etapas o entregables acordados en la cotización. Se entregará lo avanzado hasta ese momento.'],
      ['Entregas aprobadas', 'Una vez apruebas una entrega o etapa, ese pago no es reembolsable, porque el servicio ya se prestó.'],
      ['Garantía', 'Los errores del trabajo entregado se corrigen sin costo durante el período de garantía acordado en la cotización (si no se indica, 30 días calendario desde la entrega). Si un error no se puede corregir, se devuelve lo pagado por esa parte.'],
      ['Cómo pedir un reembolso', `Escribe a ${perfil.correo} con el asunto "Reembolso", indicando tu nombre, el servicio y el motivo. Respondo en máximo 5 días hábiles y, si procede, la devolución se hace dentro de los 30 días calendario siguientes por el mismo medio en que pagaste.`],
      ['Reversión del pago', 'Si pagaste con tarjeta u otro medio electrónico, conservas los derechos de reversión del pago que establece el artículo 51 de la Ley 1480 de 2011 en los casos que la ley prevé.'],
      ['Tus derechos', 'Esta política no limita los derechos que te da el Estatuto del Consumidor. Si no quedas conforme, puedes acudir a la Superintendencia de Industria y Comercio (SIC).'],
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
        {t.secciones.map(([h, p]) => (
          <div key={h}>
            <h2>{h}</h2>
            {Array.isArray(p) ? <ul>{p.map((x) => <li key={x}>{x}</li>)}</ul> : <p>{p}</p>}
          </div>
        ))}
      </div>
      {tipo === 'cookies' && <PreferenciaCookies />}
    </article>
  );
}

// Muestra la elección actual y permite volver a decidir.
function PreferenciaCookies() {
  const [estado, setEstado] = useState(leerConsentimiento());
  useEffect(() => {
    const act = () => setEstado(leerConsentimiento());
    window.addEventListener('cookies:cambio', act);
    return () => window.removeEventListener('cookies:cambio', act);
  }, []);
  const texto = estado === 'aceptadas' ? 'Aceptaste las cookies.' : estado === 'rechazadas' ? 'Rechazaste las cookies.' : 'Todavía no has elegido.';
  return (
    <div className="mt-10 flex flex-col items-start gap-3 rounded-tarjeta border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-texto-suave">Tu preferencia actual: <b className="text-white">{texto}</b></p>
      <button onClick={cambiarPreferenciaCookies} className="btn-secundario !px-5 !py-2">Cambiar mi preferencia</button>
    </div>
  );
}
