# Registro de autorizaciones (prueba ante la SIC)

Desde la **v33**, cada vez que alguien envía el formulario se guarda en la tabla
`consentimientos` de la base de datos **cuándo** y **cómo** aceptó:

| Campo | Qué guarda |
|---|---|
| `aceptado_en` | Fecha y hora exacta (del servidor, no del navegador) |
| `nombre`, `correo` | Quién aceptó |
| `acepta_terminos`, `acepta_privacidad` | Las dos casillas (siempre `true`: sin ellas el servidor rechaza el envío) |
| `version_documentos` | Versión de los Términos y la Política que vio (ej. `2026-10-21`) |
| `texto_terminos`, `texto_privacidad` | El texto EXACTO de cada casilla y el enlace al documento |
| `medio`, `pagina` | "formulario web" y la página desde la que envió |
| `ip`, `navegador` | Dirección IP y navegador usados |
| `mensaje_id` | El mensaje al que corresponde (queda vacío cuando el mensaje se borra a los 12 meses) |

## Cómo consultarlo si la SIC (o la persona) lo pide

### Opción fácil: Neon (producción)
1. Entra a **console.neon.tech** → tu proyecto → **SQL Editor**.
2. Pega esta consulta (cambia el correo) y presiona **Run**:

```sql
SELECT to_char(aceptado_en AT TIME ZONE 'America/Bogota', 'YYYY-MM-DD HH24:MI:SS') AS fecha_hora_colombia,
       nombre, correo, acepta_terminos, acepta_privacidad, version_documentos,
       medio, pagina, ip, navegador, texto_terminos, texto_privacidad
  FROM consentimientos
 WHERE correo = 'persona@correo.com'
 ORDER BY aceptado_en DESC;
```

3. Descarga el resultado (botón de exportar) y entrégalo.

### Opción PowerShell (base local)
```powershell
cd $HOME\Desktop\portafolio\backend
npm run consentimientos -- persona@correo.com
```
Crea `consentimientos-persona_correo_com.csv` (se abre con Excel). Ese archivo tiene datos
personales: **no lo subas a GitHub** (ya está en `.gitignore`) y bórralo cuando lo entregues.

## Si cambias los Términos o la Política
1. En `backend/src/config/legal.js` agrega una versión NUEVA con el texto de las casillas (no borres las viejas).
2. En `frontend/src/data/legal.js` cambia `VERSION_LEGAL` y `ACTUALIZADO`.
Así cada autorización queda ligada a la versión exacta que la persona aceptó.

## Plazos de conservación (automáticos)
- Mensajes: se borran solos a los **12 meses**.
- Registro de autorización: se conserva y se borra solo **5 años** después de borrar el mensaje.
