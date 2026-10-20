-- =========================================================
-- Actualiza una base de datos creada con versiones anteriores
-- (quita "Gestor de tareas" y cambia las imágenes a .webp)
-- sin borrar los mensajes recibidos.
-- Uso (PowerShell, en la carpeta portafolio):
--   Get-Content database\03_actualizar_v10.sql | docker exec -i portafolio-db psql -U postgres -d portafolio
-- =========================================================
DELETE FROM proyectos WHERE slug = 'gestor-tareas-php';
UPDATE proyectos SET imagen = REPLACE(imagen, '.png', '.webp') WHERE imagen LIKE '%.png';
UPDATE proyectos SET orden = 2 WHERE slug = 'automatizacion-tutorias';
UPDATE proyectos SET orden = 3 WHERE slug = 'esp32-mqtt';
SELECT slug, imagen FROM proyectos ORDER BY orden;
