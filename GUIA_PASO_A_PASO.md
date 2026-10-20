# Guía paso a paso: correr, probar y subir el portafolio

Todos los comandos son para **PowerShell** en Windows. En PowerShell 5.1 se separan comandos con `;` (no con `&&`).

---

## Paso 0 · Programas necesarios (una sola vez)

| Programa | Para qué | Cómo verificar |
|---|---|---|
| **Node.js 20 LTS** | Correr frontend y backend | `node -v` debe mostrar v20 o superior |
| **Git** | Control de versiones | `git --version` |
| **VS Code** | Editor | — |
| **Docker Desktop** | Base de datos PostgreSQL local | `docker --version` |

Descarga Node.js desde https://nodejs.org (versión LTS).

---

## Paso 1 · Descomprimir y abrir en VS Code

1. Descomprime `portafolio.zip` en `C:\Users\user\Desktop\`. Debe quedar `C:\Users\user\Desktop\portafolio\`.
2. Abre VS Code, ve a **Archivo → Abrir carpeta** y elige la carpeta `portafolio`.
3. VS Code te sugerirá instalar extensiones recomendadas. Acepta.
4. Abre la terminal con **Ctrl + ñ** (o *Terminal → Nueva terminal*). Verifica que diga PowerShell.

---

## Paso 2 · Probar solo el frontend (lo más rápido)

El frontend funciona aunque el backend esté apagado: usa datos de respaldo.

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Abre **http://localhost:5173** y recorre el sitio. Para detenerlo: **Ctrl + C**.

✅ Checkpoint: ves el eclipse con R U B É N, puedes bajar y ver todas las secciones.

---

## Paso 3 · Levantar la base de datos con Docker

1. Abre **Docker Desktop** y espera a que diga *Engine running*.
2. En una terminal nueva, desde la carpeta `portafolio`:

```powershell
docker compose up -d db
docker ps
```

Debe aparecer `portafolio-db`. La primera vez se crean las tablas y datos de `database/` automáticamente.

✅ Checkpoint: `docker ps` muestra el contenedor `portafolio-db` con estado *healthy*.

> Si ya habías creado la base y cambias los SQL, bórrala y créala de nuevo:
> `docker compose down -v; docker compose up -d db`

---

## Paso 4 · Correr el backend

Abre **otra** terminal (botón **+** en la terminal de VS Code):

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Debe decir: `API escuchando en http://localhost:4000`.

Prueba en el navegador:

- http://localhost:4000/api/salud
- http://localhost:4000/api/proyectos

O abre `backend/api.http` y haz clic en **Send Request** (extensión REST Client).

✅ Checkpoint: `/api/proyectos` devuelve SGIS, Automatización de tutorías y ESP32.

---

## Paso 5 · Ver todo junto

Con la base de datos, el backend y el frontend corriendo:

1. Recarga http://localhost:5173.
2. Ve a **Contacto** y envía un mensaje de prueba.
3. Revisa que se guardó:

```powershell
docker exec -it portafolio-db psql -U postgres -d portafolio -c "SELECT id, nombre, correo, fecha FROM mensajes;"
```

✅ Checkpoint: aparece tu mensaje en la tabla.

---

## Paso 6 · Correr las pruebas

```powershell
cd backend; npm test; cd ..
cd frontend; npm test; cd ..
```

✅ Checkpoint: backend **21 pruebas** y frontend **6 pruebas** en verde.

---

## Paso 7 · Subir a GitHub

### 7.1 Crear el repositorio en GitHub

1. Entra a https://github.com/new
2. **Repository name:** `portafolio`
3. **Description:** `Portafolio web full-stack · React + Express + PostgreSQL`
4. **Public**
5. **NO** marques *Add a README* ni *.gitignore* (el proyecto ya los trae).
6. Clic en **Create repository**.

### 7.2 Subir el código (desde la carpeta `portafolio`)

```powershell
cd C:\Users\user\Desktop\portafolio
git init
git add .
git status
```

Revisa que **no** aparezcan `node_modules` ni archivos `.env`. Luego:

```powershell
git commit -m "Portafolio: estructura inicial con frontend, backend, base de datos y CI"
git branch -M main
git remote add origin https://github.com/rubentorres-dev/portafolio.git
git push -u origin main
```

✅ Checkpoint: en GitHub ves las carpetas y, en la pestaña **Actions**, el flujo **CI** en verde.

### 7.3 Cada vez que hagas cambios

```powershell
git add .
git commit -m "Describe aquí el cambio"
git push
```

---

## ¿Qué edito para personalizarlo?

| Quiero cambiar… | Archivo |
|---|---|
| Textos, bio, servicios, experiencia, redes | `frontend/src/data/content.js` |
| Colores y fuentes | `frontend/tailwind.config.js` y `frontend/src/styles/index.css` |
| Proyectos, artículos, testimonios | `database/02_seed.sql` (o directamente en la base de datos) |
| Activar «Descargar CV» | Pon el PDF en `frontend/public/cv/` y cambia `cvUrl` en `content.js` |
| Facebook / Instagram | Cambia `url: null` por tu enlace en `redes` dentro de `content.js` |

## Problemas comunes

| Problema | Solución |
|---|---|
| `npm` no se reconoce | Reinstala Node.js y reinicia VS Code |
| *running scripts is disabled on this system* | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y responde `S` |
| Puerto 5432 ocupado | Tienes otro PostgreSQL instalado: deténlo o cambia el puerto en `docker-compose.yml` |
| El backend dice *ECONNREFUSED* | La base de datos no está corriendo: `docker compose up -d db` |
| La sección GitHub dice que no pudo conectar | Normal sin internet o si pasaste el límite de 60 consultas/hora; agrega `GITHUB_TOKEN` en `.env` |
| El globo se ve negro | Avísame con una captura y lo ajustamos |

---

## Actualizar a una versión nueva del zip

Cuando recibas un zip nuevo (por ejemplo, la v2):

1. Detén todo: **Ctrl + C** en las terminales del backend y del frontend.
2. **Guarda tus `.env`** si les pusiste claves propias (cópialos a otra carpeta).
3. Reemplaza la carpeta `portafolio` por la nueva y vuelve a poner tus `.env` (o crea nuevos con `Copy-Item .env.example .env`).
4. Si cambió la base de datos (`database/`), recréala:

```powershell
docker compose down -v; docker compose up -d db
```

5. Instala las dependencias nuevas y arranca:

```powershell
cd backend; npm install; npm run dev
```

```powershell
cd frontend; npm install; npm run dev
```

## Atajos del sitio

| Tecla | Acción |
|---|---|
| **→** | Siguiente sección |
| **←** | Sección anterior |

---

## Activar el aviso por Telegram

Cada vez que alguien llene el formulario de contacto te llegará un mensaje de Telegram con su nombre, correo y mensaje. Usa la API oficial de bots de Telegram: gratis, sin cupos y sin límite práctico de mensajes.

1. Instala **Telegram** en tu celular (o entra a https://web.telegram.org) e inicia sesión.
2. Busca **@BotFather** (tiene la insignia azul de verificado) y ábrelo.
3. Envíale `/newbot`.
4. Te pide un **nombre** visible: escribe `Portafolio Rubén`.
5. Te pide un **usuario** que termine en `bot`: por ejemplo `rubentorres_portafolio_bot`.
6. BotFather te responde con un **token** (algo como `123456789:AA...`). Es secreto.
7. Abre `backend/.env` y pon:

```
TELEGRAM_BOT_TOKEN=el_token_que_te_dio_BotFather
```

8. En Telegram abre tu bot nuevo (el enlace `t.me/...` que te dio BotFather) y pulsa **Iniciar** (envía `/start`).
9. En la terminal, dentro de `backend`:

```powershell
npm run telegram:id
```

10. Te mostrará una línea como `TELEGRAM_CHAT_ID=987654321`. Cópiala en `backend/.env`.
11. Reinicia el backend (**Ctrl + C** y `npm run dev`) y envía un mensaje de prueba desde el formulario.

> El token es secreto: vive solo en `.env` (que no se sube a GitHub). En producción se pone en las variables de entorno de Render.

---

## Activar el aviso por WhatsApp (Whapi.Cloud, plan Sandbox)

Para cuidar tu número el backend envía **máximo 5 avisos por día** y deja **2 minutos entre avisos**. Lo que pase de ahí solo llega por Telegram (y siempre queda guardado en la base de datos). Puedes cambiar esos números en `.env` con `WHAPI_MAX_DIA` y `WHAPI_MINUTOS`.

1. Crea tu cuenta en https://panel.whapi.cloud (con Google).
2. Abre **Your First Channel** y escanea el **QR** desde WhatsApp: *Ajustes → Dispositivos vinculados → Vincular un dispositivo*.
3. En la página del canal copia el **Token** con su botón de copiar.
4. En `backend/.env` pon:

```
WHAPI_TOKEN=el_token_del_canal
WHAPI_DESTINO=573245374597
```

5. Prueba sin gastar el cupo del día: `npm run whatsapp:probar` (dentro de `backend`).
6. Reinicia el backend y envía un mensaje desde el formulario. Como el aviso sale de tu propio número, lo verás en tu chat **"Tú"** de WhatsApp.

> El canal empieza en **prueba de 5 días**. Antes de que termine, pásalo al plan **Sandbox** (gratis) desde el panel. Nunca elijas un plan de pago.
> Abre WhatsApp en el celular al menos una vez cada 14 días para que la sesión siga activa.
> Si ya tenías la base de datos creada, corre una vez `database/04_avisos_whatsapp.sql` (ver CAMBIOS.md, v18).
