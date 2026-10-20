# Checklist de configuración y seguridad

✅ hecho en el código · 🚀 pendiente al publicar · ❌ no aplica a este proyecto (sí en otros)

| # | Punto | Estado | Dónde / cómo |
|---|---|---|---|
| 1 | Aviso legal | ✅ | `/aviso-legal` |
| 2 | Política de privacidad | ✅ | `/privacidad` (Ley 1581 de 2012) |
| 3 | Aviso de cookies | ✅ | `CookieNotice.jsx` + `/cookies` |
| 4 | Forzar HTTPS | 🚀 | Vercel y Render lo hacen automático; HSTS ya está en `vercel.json` |
| 5 | Meta títulos y descripciones | ✅ | `index.html` + `hooks/useSeo.js` |
| 6 | Datos estructurados | ✅ | JSON-LD *Person* en `index.html` |
| 7 | Sitemap y robots.txt | ✅ | `public/sitemap.xml`, `public/robots.txt` |
| 8 | Ficha de Google (Perfil de Empresa) | 🚀 | Opcional para freelance local en Barranquilla |
| 9 | Favicon y vista previa | ✅ | `favicon.svg`, `apple-touch-icon.png`, `og.jpg` |
| 10 | Texto alternativo | ✅ | Todas las imágenes con `alt` |
| 11 | Imágenes comprimidas | ✅ | WebP / JPEG optimizado |
| 12 | Carga rápida (< 2 s) | ✅ / 🚀 | Código dividido y carga diferida; medir con PageSpeed al publicar |
| 13 | Contraste y diseño adaptable | ✅ | Probado en móvil y escritorio |
| 14 | Página 404 personalizada | ✅ | `pages/NotFound.jsx` |
| 15 | Enlaces rotos | 🚀 | Revisar con un validador de enlaces al publicar |
| 16 | Formularios protegidos contra spam | ✅ | Honeypot + límite + Turnstile |
| 17 | Botón de WhatsApp visible | ✅ | Sección Contacto, página de gracias y pie; aviso de mensajes nuevos por Telegram (bot oficial) |
| 18 | Analítica | 🚀 | Vercel Web Analytics (gratis y sin cookies) |
| 19 | Una sola llamada a la acción | ✅ | «Hablemos» / Contacto |
| 20 | Copia de seguridad | 🚀 | El código está en GitHub; la BD con las copias de Neon |
| 21 | Anti-bots (reCAPTCHA) | ✅ | Cloudflare Turnstile (gratis, sin acertijos) |
| 22 | Bloqueo de intentos de contraseña | ❌ | No hay login. Aplica en proyectos con usuarios |
| 23 | Escáner de virus diario | ❌ / ✅ | Es para WordPress; aquí: Dependabot + `npm audit` |
| 24 | WordPress plugins y tema al día | ❌ | No usamos WordPress |
| 25 | Ningún plugin pirata | ❌ | No usamos WordPress; todas las librerías son de npm |
| 26 | Copia fuera del hosting | 🚀 | GitHub + exportar la BD de Neon cada mes |
| 27 | Acceso distinto a wp-admin | ❌ | No usamos WordPress |
| 28 | Verificación en 2 pasos | 🚀 | Actívala en GitHub, Vercel, Render, Neon y Cloudflare |
| 29 | Quitar el noindex | ✅ | El sitio ya está en `index, follow` |
| 30 | Alta en Search Console | 🚀 | Al tener el dominio |
| 31 | Alta en Bing Webmaster Tools | 🚀 | Se importa desde Search Console |
| 32 | Teléfono y correo tocables | ✅ | Íconos de Gmail y WhatsApp en Contacto y pie |
| 33 | Íconos de redes reales | ✅ | Font Awesome con colores de marca |
| 34 | Redirecciones 301 | 🚀 | Si cambias de dominio, en `vercel.json` |
| 35 | Una sola versión del dominio | 🚀 | Configurar en Vercel (con o sin www) |
| 36 | URL canónicas | ✅ | `useSeo.js` |
| 37 | URLs limpias | ✅ | `/proyectos/sgis`, `cleanUrls` en Vercel |
| 38 | Jerarquía de enlaces internos | ✅ | Navbar, tarjetas → detalle, blog → artículo |
| 39 | Página de intención de búsqueda | ✅ | Inicio enfocado en «desarrollador full-stack Barranquilla / remoto» |
| 40 | Vista previa al compartir | ✅ | Open Graph |
| 41 | Caché configurada | ✅ | `vercel.json` y `nginx.conf` |
| 42 | SSL con renovación automática | 🚀 | Vercel y Render lo renuevan solos |
| 43 | Copias de seguridad automáticas | 🚀 | Neon guarda historial; GitHub guarda el código |
| 44 | Aviso si la web se cae | 🚀 | UptimeRobot gratis (también evita que Render se duerma) |
| 45 | Borrar contenido de prueba | 🚀 | Revisar artículos de ejemplo y mensajes de prueba |
| 46 | Probar en varios navegadores | 🚀 | Chrome, Edge, Firefox y Safari (iPhone) |
| 47 | Página de gracias | ✅ | `/gracias` |
| 48 | Medir conversiones | 🚀 | Contar visitas a `/gracias` en la analítica |
| 49 | Rate limiting | ✅ | 120 peticiones/min y 5 mensajes/hora por IP |
| 50 | Archivo .env | ✅ | `.env.example` en backend y frontend |
| 51 | Secretos en Vercel / Render / GitHub | 🚀 | Variables de entorno de cada servicio |
| 52 | Límite por IP | ✅ | `express-rate-limit` + `trust proxy` |
| 53 | Limpieza de entradas | ✅ | `validators/contacto.schema.js` |
| 54 | Validación en el servidor | ✅ | Zod en el backend (además de la del navegador) |
| 55 | RLS (Row Level Security) | ❌ | Sin usuarios; aplica en proyectos con login |
| 56 | Cifrado | ✅ / ❌ | HTTPS cifra en tránsito; no se guardan datos sensibles |
| 57 | Sesiones con expiración | ❌ | Sin login; aplica con Keycloak / JWT |
| 58 | CORS bien configurado | ✅ | Solo el dominio del sitio, solo GET y POST |
| 59 | Ocultar el código / bloquear «Inspeccionar» | ❌ | No es posible en la web. Lo importante (llaves) nunca llega al navegador |
| 60 | Ocultar llaves de BD, APIs, pagos | ✅ | Solo en el backend y `.env` |
| 61 | Ocultar llaves API | ✅ | Igual que el 60 |
| 62 | Guardar las llaves en .env | ✅ | `.env` está en `.gitignore` |
