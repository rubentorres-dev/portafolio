-- =========================================================
-- Datos iniciales. Edítalos con tu información real.
-- =========================================================

INSERT INTO tecnologias (nombre, categoria, color) VALUES
  ('Java', 'lenguaje', '#F89820'), ('JavaScript', 'lenguaje', '#F7DF1E'), ('Python', 'lenguaje', '#3776AB'),
  ('PHP', 'lenguaje', '#777BB4'), ('MicroPython', 'lenguaje', '#2B5B84'), ('HTML/CSS', 'lenguaje', '#E34F26'),
  ('React', 'framework', '#61DAFB'), ('Express', 'framework', '#FFFFFF'), ('Flet', 'framework', '#02569B'),
  ('JavaFX', 'framework', '#EA2D2E'), ('Tailwind', 'framework', '#38BDF8'),
  ('MySQL', 'base_datos', '#4479A1'), ('PostgreSQL', 'base_datos', '#336791'), ('SQL Server', 'base_datos', '#CC2927'),
  ('Docker', 'devops', '#2496ED'), ('GitHub Actions', 'devops', '#2088FF'),
  ('n8n', 'herramienta', '#EA4B71'), ('Google Sheets', 'herramienta', '#34A853'), ('ESP32', 'herramienta', '#00A8E8'),
  ('MQTT', 'herramienta', '#660066'), ('Power BI', 'herramienta', '#F2C811');

INSERT INTO proyectos (slug, titulo, resumen, descripcion, nivel, estado, repo_url, imagen, destacado, orden) VALUES
  ('sgis', 'SGIS · Inventario y ventas',
   'Sistema de gestión de inventario y ventas para supermercados con arquitectura MVC.',
   'Aplicación de escritorio en Java con JavaFX y MySQL. Gestiona productos, inventario, ventas, usuarios y reportes. Documentada bajo el estándar IEEE 29148:2011.',
   1, 'terminado', 'https://github.com/rubentorres-dev/sgis-app', '/img/proyectos/sgis.webp', TRUE, 1),
  ('automatizacion-tutorias', 'Automatización de tutorías',
   'Flujo en n8n que registra y combina las tutorías en Google Sheets.',
   'Automatización usada en la monitoría académica de la CUL: combina las hojas de asistencias y solicitudes para generar el reporte final, eliminando trabajo manual.',
   1, 'en_uso', NULL, '/img/proyectos/n8n.webp', TRUE, 2),
  ('esp32-mqtt', 'ESP32 con MQTT',
   'Monitoreo IoT con ESP32 y MicroPython publicando datos por MQTT.',
   'Prototipo simulado en Wokwi: el ESP32 lee sensores y publica los valores en un broker MQTT.',
   1, 'terminado', NULL, NULL, FALSE, 3);

INSERT INTO proyecto_tecnologia (proyecto_id, tecnologia_id)
SELECT p.id, t.id FROM proyectos p JOIN tecnologias t ON
  (p.slug = 'sgis' AND t.nombre IN ('Java', 'JavaFX', 'MySQL')) OR
  (p.slug = 'automatizacion-tutorias' AND t.nombre IN ('n8n', 'Docker', 'Google Sheets')) OR
  (p.slug = 'esp32-mqtt' AND t.nombre IN ('ESP32', 'MicroPython', 'MQTT'));

-- Borradores del blog: revísalos y cámbialos a publicado = TRUE cuando estén listos.
INSERT INTO articulos (slug, titulo, resumen, contenido_md, etiquetas, minutos_lectura, publicado, fecha) VALUES
  ('docker-en-8gb', 'Docker en un PC de 8 GB sin morir en el intento',
   'Cómo limitar la memoria de WSL y levantar varios servicios a la vez.',
   E'## El problema\n\nCon 8 GB de RAM, Docker Desktop sobre WSL puede consumir casi toda la memoria.\n\n## La solución\n\nCrear el archivo `%UserProfile%\\.wslconfig` con:\n\n```ini\n[wsl2]\nmemory=3GB\nprocessors=2\n```\n\nLuego reiniciar WSL con `wsl --shutdown`.\n',
   ARRAY['Docker', 'WSL'], 5, TRUE, '2026-10-10'),
  ('n8n-tutorias', 'Automaticé el registro de tutorías con n8n',
   'De planillas manuales a un flujo automático en Google Sheets.',
   E'## Contexto\n\nComo monitor académico registraba cada tutoría a mano.\n\n## El flujo\n\n1. Lee la hoja de asistencias.\n2. Lee la hoja de solicitudes.\n3. Combina ambos datos y genera el reporte final.\n',
   ARRAY['n8n', 'Automatización'], 7, TRUE, '2026-10-05'),
  ('mvc-con-sgis', 'MVC explicado con SGIS',
   'Cómo separé modelo, vista y controlador en una app de Java.',
   E'## ¿Qué es MVC?\n\n- **Modelo:** datos y acceso a la base de datos.\n- **Vista:** lo que ve el usuario.\n- **Controlador:** conecta la vista con el modelo.\n',
   ARRAY['Java', 'Arquitectura'], 6, TRUE, '2026-09-28');

-- Testimonios: agrega solo testimonios REALES y con permiso. Ejemplo (no aprobado, no se muestra):
INSERT INTO testimonios (nombre, cargo, relacion, texto, aprobado) VALUES
  ('Nombre del docente', 'Docente · Ingeniería de Sistemas, CUL', 'docente',
   'Texto del testimonio real (reemplazar).', FALSE);
