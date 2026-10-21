// =====================================================================
// CONTENIDO FIJO DEL PORTAFOLIO
// Edita aquí tus textos. Los proyectos y el blog vienen del backend;
// si el backend no responde, se usan los datos de respaldo de abajo.
// =====================================================================

export const perfil = {
  nombre: 'Rubén Torres Osorio',
  nombreCorto: 'RUBEN', // nombre del inicio (sin tilde)
  marca: 'DEV',        // va después del guion: RUBEN - DEV
  titulo: 'Desarrollador Full-Stack Junior',
  frases: [
    'Desarrollador full-stack',
    'APIs REST con Node y Express',
    'Bases de datos MySQL y PostgreSQL',
    'Sistemas en Java con arquitectura MVC',
    'Automatización de procesos con n8n',
    'Dashboards en Power BI',
    'Docker y GitHub Actions',
    'Páginas web con base de datos',
    'Monitor académico de programación',
  ],
  frasesPie: [
    'Toda historia empieza en algún lugar.',
    'Si puedes imaginarlo, puedes crearlo.',
    'Las grandes mentes siempre empiezan desde abajo.',
  ],
  ciudad: 'Barranquilla, Colombia',
  correo: 'rubentorres.devs@gmail.com',
  whatsapp: '573245374597', // formato internacional sin "+"
  telegram: 'rubentorres_DEV', // usuario de Telegram sin "@"
  // Cuando crees las cuentas, cambia null por el usuario (sin "@") y se activan solos los botones e íconos:
  instagram: 'rubentorresdev', // instagram.com/rubentorresdev
  tiktok: 'rubentorres.dev', // tiktok.com/@rubentorres.dev
  facebook: 'profile.php?id=61595662231133', // perfil Ruben Torres Dev (cámbialo por el usuario de la página cuando exista)
  // Pon tu CV en frontend/public/cv/ y cambia null por '/cv/Ruben_Torres_Osorio_CV.pdf'
  cvUrl: null,
  bio: [
    'Soy estudiante de sexto semestre de Ingeniería de Sistemas en la Corporación Universitaria Latinoamericana (CUL) y desarrollador full-stack junior.',
    'Construyo aplicaciones web y de escritorio con bases de datos, arquitectura MVC y automatizaciones que ahorran tiempo. Me interesan el backend, los datos y llevar procesos manuales a flujos automáticos.',
  ],
  datos: [
    { valor: '6.º', texto: 'semestre de Ingeniería de Sistemas' },
    { valor: '2025', texto: 'monitor académico de programación' },
    { valor: '2026', texto: 'auxiliar de sistemas' },
    { valor: '100%', texto: 'disponible para trabajo remoto' },
  ],
};

// icono: nombre del ícono en components/ui/SocialIcon.jsx · color: color de la marca.
// url: null = perfil aún no creado (se colorea pero no abre nada).
export const redes = [
  { nombre: 'LinkedIn', icono: 'linkedin', color: '#0A66C2', url: 'https://www.linkedin.com/in/rubentorres-dev' },
  { nombre: 'GitHub', icono: 'github', color: '#F0F6FC', url: 'https://github.com/rubentorres-dev' },
  { nombre: 'Gmail', icono: 'gmail', color: '#EA4335', url: `mailto:${perfil.correo}` },
  { nombre: 'WhatsApp', icono: 'whatsapp', color: '#25D366', url: 'https://wa.me/573245374597' },
  { nombre: 'Telegram', icono: 'telegram', color: '#26A5E4', url: 'https://t.me/rubentorres_DEV' },
  { nombre: 'Instagram', icono: 'instagram', color: '#E1306C', url: perfil.instagram ? `https://www.instagram.com/${perfil.instagram}` : null },
  { nombre: 'TikTok', icono: 'tiktok', color: '#FE2C55', url: perfil.tiktok ? `https://www.tiktok.com/@${perfil.tiktok}` : null },
  { nombre: 'Facebook', icono: 'facebook', color: '#1877F2', url: perfil.facebook ? `https://www.facebook.com/${perfil.facebook}` : null },
];

// Orden de navegación con las flechas ← → del teclado
export const secciones = ['inicio', 'sobre-mi', 'tecnologias', 'experiencia', 'proyectos', 'alcance', 'servicios', 'github', 'blog', 'contacto'];

// Las tecnologías están en data/tecnologias.js

export const experiencia = [
  {
    cargo: 'Auxiliar de Programación – Virtualidad', empresa: 'Corporación Universitaria Latinoamericana', periodo: '2026 – Actual',
    texto: 'Administro la plataforma virtual, creo cursos y contenido digital, programo reuniones en Teams y doy soporte a docentes y estudiantes.',
  },
  {
    cargo: 'Monitor Académico de Programación', empresa: 'Corporación Universitaria Latinoamericana', periodo: 'Feb 2025 – Actual',
    texto: 'Tutorías en Programación I y II, POO, Estructuras de Datos, Bases de Datos y Frontend. Automaticé el registro de tutorías con n8n.',
  },
  {
    cargo: 'Auxiliar de Laboratorio y Asesor de Ventas', empresa: 'Genética Porcina Semik S.A.S.', periodo: '2021 – 2026',
    texto: 'Registro y control de muestras, manejo de datos en hojas de cálculo, protocolos de calidad y atención a clientes.',
  },
];

export const alcance = [
  { valor: 25, sufijo: '', texto: 'proyectos en el plan de portafolio' },
  { valor: 8, sufijo: '+', texto: 'lenguajes y tecnologías' },
  { valor: 1, sufijo: '', texto: 'año de experiencia laboral' },
  { valor: 21, sufijo: '', texto: 'países hispanohablantes, trabajo remoto' },
];

export const servicios = [
  { icono: '◈', titulo: 'Páginas web con base de datos', texto: 'Sitios y sistemas web a la medida, con panel de gestión.', items: ['Diseño responsive', 'MySQL / PostgreSQL', 'Despliegue incluido'] },
  { icono: '⌁', titulo: 'Backend y APIs', texto: 'APIs REST seguras y bien documentadas para tu aplicación.', items: ['Node / Express', 'Autenticación', 'Arquitectura MVC'] },
  { icono: '⟳', titulo: 'Automatizaciones', texto: 'Flujos que eliminan tareas manuales repetitivas.', items: ['n8n', 'Google Sheets y correo', 'Formularios y WhatsApp'] },
  { icono: '▥', titulo: 'Dashboards Power BI', texto: 'Convierte tus datos en reportes claros para decidir.', items: ['Limpieza de datos', 'Indicadores (KPI)', 'Reportes automáticos'] },
];

// ---------- Respaldo si el backend no está disponible ----------
export const proyectosRespaldo = [
  { slug: 'sgis', titulo: 'SGIS · Inventario y ventas', resumen: 'Sistema de gestión de inventario y ventas para supermercados con arquitectura MVC.', descripcion: 'Aplicación de escritorio en Java con JavaFX y MySQL. Gestiona productos, inventario, ventas, usuarios y reportes. Documentada bajo IEEE 29148:2011.', nivel: 1, estado: 'terminado', repo_url: 'https://github.com/rubentorres-dev/sgis-app', imagen: '/img/proyectos/sgis.webp', destacado: true, tecnologias: ['Java', 'JavaFX', 'MySQL'] },
  { slug: 'automatizacion-tutorias', titulo: 'Automatización de tutorías', resumen: 'Flujo en n8n que registra y combina las tutorías en Google Sheets.', descripcion: 'Combina las hojas de asistencias y solicitudes para generar el reporte final de la monitoría.', nivel: 1, estado: 'en_uso', repo_url: null, imagen: '/img/proyectos/n8n.webp', destacado: true, tecnologias: ['n8n', 'Docker', 'Google Sheets'] },
  { slug: 'esp32-mqtt', titulo: 'ESP32 con MQTT', resumen: 'Monitoreo IoT con ESP32 y MicroPython publicando datos por MQTT.', descripcion: 'Prototipo simulado en Wokwi que publica lecturas de sensores en un broker MQTT.', nivel: 1, estado: 'terminado', repo_url: null, imagen: null, destacado: false, tecnologias: ['ESP32', 'MicroPython', 'MQTT'] },
];

export const articulosRespaldo = [
  { slug: 'docker-en-8gb', titulo: 'Docker en un PC de 8 GB sin morir en el intento', resumen: 'Cómo limitar la memoria de WSL y levantar varios servicios.', etiquetas: ['Docker', 'WSL'], minutos_lectura: 5, fecha: '2026-10-10', contenido_md: '## El problema\n\nCon 8 GB de RAM, Docker Desktop puede consumir casi toda la memoria.\n\n## La solución\n\nLimitar WSL a 3 GB con el archivo `.wslconfig`.' },
  { slug: 'n8n-tutorias', titulo: 'Automaticé el registro de tutorías con n8n', resumen: 'De planillas manuales a un flujo automático.', etiquetas: ['n8n', 'Automatización'], minutos_lectura: 7, fecha: '2026-10-05', contenido_md: '## Contexto\n\nComo monitor registraba cada tutoría a mano. Ahora un flujo de n8n lo hace solo.' },
  { slug: 'mvc-con-sgis', titulo: 'MVC explicado con SGIS', resumen: 'Cómo separé modelo, vista y controlador en Java.', etiquetas: ['Java', 'Arquitectura'], minutos_lectura: 6, fecha: '2026-09-28', contenido_md: '## ¿Qué es MVC?\n\n- **Modelo:** datos.\n- **Vista:** interfaz.\n- **Controlador:** conecta ambos.' },
];

export const estados = {
  terminado: { texto: 'Terminado', color: 'text-emerald-300' },
  en_uso: { texto: 'En uso', color: 'text-emerald-300' },
  en_progreso: { texto: 'En progreso', color: 'text-amber-300' },
  planeado: { texto: 'Planeado', color: 'text-sky-300' },
};
