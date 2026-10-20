# Historial de cambios

## v25 · 20 de octubre de 2026

- **Celulares: la página ya no se corre sola ni queda en blanco en Proyectos.**
  - Se quitó `overflow` de `<body>` (con `overflow` en html y body a la vez el iPhone desplaza la página de forma errática); queda solo `overflow-x: clip` en `<html>`.
  - En pantallas táctiles el scroll es el nativo del teléfono (Lenis solo con mouse/trackpad).
  - Las tarjetas de proyectos no usan inclinación 3D en táctil y aparecen una sola vez, sin animación de "layout".
  - Menos memoria gráfica en celulares (brillo del agujero negro y de la media luna más cortos).
- **Botón ☰ con Liquid Glass**: burbuja de vidrio con reflejo; las 3 rayas se convierten en ✕. Menú desplegable de vidrio más denso.
- **Agujero negro con efecto agua**: dos ondas de luz suaves que giran a distinto ritmo y "respiran", sin filtros (solo transform).

## v24 · 20 de octubre de 2026

- **Agujero negro: vuelve la luz infinita que recorre la curva.** En la v22/v23 una línea de optimización (`transform: translateZ(0)`) anulaba el giro y el anillo se veía como una imagen fija. Ahora gira de nuevo, igual de fluido y sin filtros.
- **Celulares: la pantalla ya no "se corre" en Proyectos.** Los proyectos se muestran de inmediato (sin el esqueleto de carga que cambiaba el alto de la página) y el borde animado de la tarjeta destacada ya no usa una capa más grande que la tarjeta.
- **Logo de Google Cloud**: el archivo se renombró a `gcp.svg` (algunos bloqueadores de anuncios bloqueaban el nombre `googlecloud`).

## v23 · 20 de octubre de 2026

- Sobre mí: nuevo panel **2026 · auxiliar de sistemas** (4 paneles: 2×2 en celular, en fila en PC).
- **Aviso de cookies con consentimiento**: "Este sitio usa cookies…" con botones **Aceptar** y **Rechazar**. La elección se recuerda; en `/cookies` se ve la preferencia actual y se puede cambiar. Política de cookies actualizada.
- Incluye todo lo de la v22 (animaciones fluidas y bloqueo de zoom en celulares).

## v22 · 20 de octubre de 2026

- **Agujero negro mucho más fluido** (celular y PC): se quitaron los filtros (blur / drop-shadow) que se recalculaban en cada cuadro sobre capas que giran. Ahora el brillo sale de máscaras difuminadas y la tarjeta gráfica solo rota capas ya dibujadas. Se pausa cuando no está en pantalla. Mismo aspecto visual.
- **RUBEN — DEV**: el brillo de cada letra es una copia estática detrás (antes eran 3 filtros animados).
- **Frases que se escriben**: más rápidas y con cada letra entrando con un fundido suave; el cursor parpadea suave. No parten palabras al saltar de línea.
- **Sin zoom ni desplazamiento lateral en celulares y tablets**: se bloquea pellizcar, el doble toque y el arrastre hacia los lados; la página ya no se puede "alejar".
- Globo: puntos pre-dibujados (sin `shadowBlur` por punto) y se detiene cuando no se ve.
- Bordes animados de tarjetas: giran con transform (sin repintar) y los del blog solo se mueven al pasar el cursor.
- ScrollTrigger ignora el cambio de alto de la barra del navegador en celulares (menos tirones al bajar).

## v21 · 20 de octubre de 2026

- El backend prefiere **IPv4** en las conexiones salientes (Telegram, Whapi, GitHub). Arregla el "Connect Timeout" en redes con IPv6 inestable.
- `npm run whatsapp:probar` y `npm run telegram:id` muestran un mensaje claro si no hay conexión, en lugar de un error largo.

## v20 · 20 de octubre de 2026

- Página **"¡Mensaje enviado!"**: eclipse total más grande con todo el contenido dentro; la luz sale de detrás del disco, se intensifica y queda "respirando".
- Nueva página **Términos y condiciones** (`/terminos`), enlazada en el pie de página y en el sitemap.
- **Política de privacidad actualizada**: encargados del tratamiento (Vercel, Render, Neon, Cloudflare, Telegram, Whapi, Gmail), transferencia internacional y seguridad.
- Formulario: **casilla obligatoria** de autorización de datos (Ley 1581). El backend también la exige.
- Código publicado más protegido: sin mapas de código fuente, sin `console.log` ni comentarios, y nombres de archivo sin pistas.
- Incluye los cambios de la v19 (aviso por WhatsApp con Whapi.Cloud). Backend: 21 pruebas; frontend: 6 pruebas.

## v19 · 20 de octubre de 2026

- El aviso por WhatsApp ahora usa **Whapi.Cloud** (plan Sandbox, gratis) en lugar de Green API. Se mantienen los límites: 5 avisos por día y 2 minutos entre avisos.
- Variables en `backend/.env`: `WHAPI_TOKEN`, `WHAPI_DESTINO`, `WHAPI_MAX_DIA`, `WHAPI_MINUTOS` (se quitaron las de Green API).
- Nuevo comando `npm run whatsapp:probar` para enviar un WhatsApp de prueba sin gastar el cupo del día.

## v18 · 19 de octubre de 2026

- **Aviso por WhatsApp con Green API** (plan Developer, gratis): máximo **5 avisos por día** (hora de Colombia) y **2 minutos** entre avisos. El contador vive en la base de datos, así que no se reinicia. Lo que pase del límite solo llega por Telegram.
- **Límite general del formulario: 15 mensajes por hora** sumando a todos los visitantes (además de 5 por hora por persona).
- **Ícono de Telegram** (@rubentorres_DEV) con su azul oficial y brillo: en Contacto (botón junto a WhatsApp y en las redes), en el pie de página y en la página de gracias.
- Base de datos: nueva columna `aviso_whatsapp` en `mensajes` (`database/04_avisos_whatsapp.sql`). Para una base ya creada:
  `Get-Content database\04_avisos_whatsapp.sql | docker exec -i portafolio-db psql -U postgres -d portafolio`
- 20 pruebas en el backend.

## v17 · 19 de octubre de 2026

- El aviso de mensajes nuevos ahora llega por **Telegram** (API oficial de bots: gratis, sin cupos). Reemplaza a CallMeBot, que no tenía cupos disponibles.
- Nuevo comando `npm run telegram:id` en el backend para obtener tu `TELEGRAM_CHAT_ID`.
- Variables nuevas en `backend/.env`: `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID` (se quitaron las de CallMeBot).

## v16 · 19 de octubre de 2026

- Globo: se puede **arrastrar con el mouse o el dedo** hacia la derecha o la izquierda, con inercia al soltar.
- Al pasar el cursor sobre un país, **los demás se ocultan** y solo queda ese país iluminado; al quitar el cursor vuelven todos.

## v15 · 19 de octubre de 2026

- Alcance: la cifra de experiencia ahora dice **1 año de experiencia laboral**.
- Globo: los **21 países hispanohablantes se pintan en blanco** sobre el globo. Al pasar el cursor (o tocar en el celular) aparece el **nombre del país con su bandera** y el globo se frena para que se pueda leer.
- Datos de los países en `frontend/src/data/paisesGlobo.json` (Natural Earth, dominio público) y banderas en `frontend/public/flags/` (flag-icons, licencia MIT).

## v14 · 19 de octubre de 2026

- **Aviso por WhatsApp** de cada mensaje del formulario con CallMeBot (`backend/src/services/whatsapp.service.js`). Se activa llenando `CALLMEBOT_PHONE` y `CALLMEBOT_APIKEY` en `backend/.env`. Si falla, el mensaje igual se guarda.
- 4 pruebas nuevas en el backend (16 en total).

## v13 · 19 de octubre de 2026

- Sobre mí: se quitó el **borde circular cortado** del brillo azul de la media luna; ahora se desvanece suave. Nada más cambió.

## v12 · 19 de octubre de 2026

- **Media luna con los colores del video** (Sobre mí y 404): fondo **azul eléctrico** intenso, media luna fina **blanca por dentro y magenta por fuera**, destello blanco muy brillante a la izquierda y rayo de luz horizontal. Solo cambió el estilo; el resto de la página quedó igual.

## v11 · 19 de octubre de 2026

- **RUBEN — DEV dentro del agujero negro:** la curva baja más y el nombre, las frases y los botones quedan en el centro, dentro del anillo.
- **Secciones centradas al navegar:** con el menú o con las flechas, si la sección cabe en la pantalla queda centrada; si es más alta, se muestra desde su inicio.
- **Sobre mí cabe en la pantalla** de una laptop: avatar y textos ajustados a la altura.
- **Tarjetas de datos** (6.º, 2025, 100%) con borde neón al pasar el cursor, como las tecnologías.

## v10 · 19 de octubre de 2026

- **Inicio igual al video:** un anillo enorme cuya mitad inferior cruza la pantalla **de un lado a otro**. **R U B E N — D E V** queda repartido de borde a borde sobre la curva, y las frases y los botones van debajo. Se ajusta en celular, laptop, monitor y ultrawide.
- **Sin borde al pasar del inicio a Sobre mí** (con flechas o con scroll): fundido al final del inicio, y el texto «Desliza» se desvanece al bajar.
- **Logos oficiales:** AWS (amarillo), Linux (pingüino con patas amarillas), Power BI, n8n, Thymeleaf, Hotwire, ESP32 (Espressif), Keycloak, WebSockets, Kafka, Socket.io, Heroku. Más brillo para MySQL, SQL Server, Prisma, Electron y los de .NET. Flet y Wompi se quedan con sus iniciales porque no hay un logo oficial libre.
- **Proyectos:** si una imagen no carga, se muestra el ícono `</>` en vez de una imagen rota. Nuevo `database/03_actualizar_v10.sql` para actualizar una base de datos vieja sin perder los mensajes.
- **Botón de WhatsApp** se ilumina en verde al pasar el cursor, como los íconos de redes.

## v9 · 19 de octubre de 2026

- **Sobre mí se anima solo:** al llegar a la sección, la media luna nace, crece y el texto entra sin necesidad de seguir bajando. Luego la luz sigue «respirando». Se repite cada vez que vuelves.
- **Agujero negro más grande y centrado**, con **RUBEN — DEV**, las frases y los botones **dentro** del círculo. Su tamaño es el menor entre el 88 % del alto y el 92 % del ancho de la pantalla, así se ve completo en cualquier dispositivo. Al bajar, crece hasta llenar la pantalla.

## v8 · 19 de octubre de 2026

- **Monitores muy grandes** (2K, ultrawide 3440, 4K, 36" o más): a partir de 2200 px de ancho la página entera crece en proporción, como un zoom, para que no se vea pequeña ni vacía.
- El agujero negro ahora usa medidas en `rem`, así que también crece con la pantalla.

## v7 · 19 de octubre de 2026

- El inicio ahora dice **RUBEN — DEV**, en tamaño medio, con una línea de luz violeta como guion. Así resalta el agujero negro.
- El tamaño se ajusta solo a cualquier pantalla (celular, laptop, monitor grande) con `clamp()`.
- Contenido más ancho en monitores grandes (2xl).

## v6 · 19 de octubre de 2026

- **Animaciones que se repiten:** cada sección vuelve a animarse cada vez que entra en pantalla, como si cargara por primera vez. Al salir, sus elementos se ocultan y esperan su turno.
  - Aplica a títulos, textos, tarjetas de tecnologías (ahora entran una por una), proyectos, servicios, experiencia, blog, contacto, contadores (vuelven a contar desde 0), barras de GitHub y el nombre del inicio.
  - Configuración central en `frontend/src/data/animacion.js`.

## v5 · 19 de octubre de 2026

- **Media luna de luz** (`components/effects/LunaEclipse.jsx`), basada en la escena «Completely anonymous» del video:
  - **Sobre mí:** la sección se queda fija y, mientras bajas, nace una línea de luz violeta en el borde de tu avatar, crece hasta una media luna con destello y fondo azul eléctrico, entra el texto y al salir la luz se vuelve cálida/dorada. En celular se reproduce sola al llegar.
  - **Página 404:** la media luna hace el ciclo completo en bucle alrededor del «404».

## v4 · 19 de octubre de 2026

- **Corregido:** al volver al inicio después de bajar, el nombre y los botones ya no desaparecen. Cada animación tiene valores de inicio y fin fijos, y el desplazamiento es más suave.
- **Nombre con media luna de luz**: una franja blanca y violeta recorre cada letra sola, sin parar, como el brillo del agujero negro.
- **Filtros de proyectos** (Todos, Java, PHP…) con neón de su color al pasar el cursor.
- Se quitaron el correo y el teléfono escritos en Contacto; ya están en los íconos.

## v3 · 19 de octubre de 2026

- **Agujero negro nuevo** (`components/effects/Eclipse.jsx`), igual al video de referencia:
  - La luz **recorre toda la curva** sin parar: el anillo tiene zonas blancas brillantes que giran.
  - Un segundo anillo gira al revés y crea destellos cuando se cruzan.
  - **Tres cometas con estela** recorren el borde.
  - Halo exterior azul-violeta que gira lento y parpadeo suave de la luz.
  - Neblina azul dentro del disco y fondo azul profundo en el inicio.
  - En celulares el efecto se aligera; con «reducir movimiento» se queda quieto.

## v2 · 19 de octubre de 2026

### Diseño e interacciones
- Barra de navegación estilo **Liquid Glass**: una pastilla de vidrio marca la sección actual y sigue al cursor.
- Agujero negro **más pequeño al inicio** que crece al bajar, con destellos que **giran sin parar** y brillo que respira.
- Nombre **R U B E N** sin tilde y con reflejo de **media luna violeta**.
- Caja de herramientas con las **81 tecnologías** del README, cada una con su logo y **neón de su color** al pasar el cursor.
- Se quitó el proyecto «Gestor de tareas».
- Borde **neón multicolor** (estilo Google) en testimonios y blog; neón de **un solo color** en servicios.
- Campos del formulario que **se vuelven blancos** al escribir, con etiqueta flotante.
- Logo de **WhatsApp** en el botón y redes sociales con **su color de marca** al pasar el cursor.
- Pie de página con **barra de colores**, frases que se escriben solas e íconos de redes.
- Navegación con **flechas ← →** del teclado entre secciones.
- Más frases en el inicio, tomadas del CV y GitHub.

### Configuración, SEO y seguridad
- Páginas de **Aviso legal**, **Política de privacidad** (Ley 1581) y **Cookies**, más aviso de cookies.
- **Página de gracias** después de enviar el formulario.
- Meta títulos y descripciones por página, URL canónica, **datos estructurados** (Person), `sitemap.xml`, `robots.txt`, vista previa al compartir e ícono para iPhone.
- Imágenes convertidas a **WebP** y páginas secundarias cargadas bajo demanda.
- **Cloudflare Turnstile** contra bots (verificado en el servidor), limpieza de datos de entrada y CORS restringido a GET y POST.
- Cabeceras de seguridad en Vercel y Nginx (HSTS, X-Frame-Options, etc.).
- Dependencias actualizadas sin vulnerabilidades en el backend; **Dependabot** y `npm audit` en GitHub Actions.
