# Portafolio · Rubén Torres Osorio

Sitio personal de **Rubén Torres Osorio**, desarrollador full-stack junior en Barranquilla, Colombia.
Muestra proyectos, experiencia, servicios freelance, actividad de GitHub, blog y un formulario de contacto.

![Vista previa](frontend/public/img/og.jpg)

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Animación | Framer Motion, GSAP + ScrollTrigger, Lenis, cobe |
| Backend | Node.js 20, Express (arquitectura MVC) |
| Base de datos | PostgreSQL 16 (Neon en producción, Docker en local) |
| Seguridad | Helmet, CORS, Zod, límite de envíos, honeypot, Cloudflare Turnstile |
| Pruebas | Jest + Supertest (backend), Vitest + Testing Library (frontend) |
| DevOps | Docker, Docker Compose, GitHub Actions |

## Estructura

```
portafolio/
├── frontend/      React + Vite (lo que ve el visitante)
├── backend/       API REST en Express con MVC
├── database/      Esquema y datos iniciales (SQL)
├── docs/          Documentación del proyecto
├── .github/       Integración continua
└── docker-compose.yml
```

## Cómo correrlo en local

> Guía detallada para Windows y PowerShell: [GUIA_PASO_A_PASO.md](GUIA_PASO_A_PASO.md)

```powershell
# 1. Base de datos
docker compose up -d db

# 2. Backend (otra terminal)
cd backend; Copy-Item .env.example .env; npm install; npm run dev

# 3. Frontend (otra terminal)
cd frontend; Copy-Item .env.example .env; npm install; npm run dev
```

Abre http://localhost:5173

## API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/salud` | Estado del servicio |
| GET | `/api/proyectos?lenguaje=&nivel=&destacado=` | Lista de proyectos |
| GET | `/api/proyectos/:slug` | Detalle de un proyecto |
| GET | `/api/articulos` | Artículos publicados |
| GET | `/api/articulos/:slug` | Detalle de un artículo |
| GET | `/api/testimonios` | Testimonios aprobados |
| GET | `/api/github/stats` | Estadísticas de GitHub (caché de 1 hora) |
| POST | `/api/contacto` | Envía un mensaje (5 por hora por IP) |

## Pruebas

```powershell
cd backend; npm test
cd ../frontend; npm test
```

## Autor

**Rubén Torres Osorio** · [LinkedIn](https://www.linkedin.com/in/rubentorres-dev) · [GitHub](https://github.com/rubentorres-dev)
