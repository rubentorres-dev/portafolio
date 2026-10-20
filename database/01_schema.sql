-- =========================================================
-- Portafolio Rubén Torres Osorio · Esquema de base de datos
-- PostgreSQL 16 (Neon en producción, Docker en local)
-- =========================================================

DROP TABLE IF EXISTS proyecto_tecnologia, mensajes, testimonios, articulos, tecnologias, proyectos CASCADE;

CREATE TABLE proyectos (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(80)  NOT NULL UNIQUE,
  titulo      VARCHAR(120) NOT NULL,
  resumen     VARCHAR(300) NOT NULL,
  descripcion TEXT,
  nivel       SMALLINT     NOT NULL DEFAULT 1 CHECK (nivel BETWEEN 0 AND 3),
  estado      VARCHAR(20)  NOT NULL DEFAULT 'en_progreso'
              CHECK (estado IN ('terminado', 'en_progreso', 'en_uso', 'planeado')),
  repo_url    VARCHAR(255),
  demo_url    VARCHAR(255),
  imagen      VARCHAR(255),
  destacado   BOOLEAN      NOT NULL DEFAULT FALSE,
  orden       INTEGER      NOT NULL DEFAULT 100,
  creado_en   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE tecnologias (
  id        SERIAL PRIMARY KEY,
  nombre    VARCHAR(50) NOT NULL UNIQUE,
  categoria VARCHAR(30) NOT NULL
            CHECK (categoria IN ('lenguaje', 'framework', 'base_datos', 'devops', 'herramienta')),
  color     VARCHAR(7)  NOT NULL DEFAULT '#A78BFA'
);

CREATE TABLE proyecto_tecnologia (
  proyecto_id   INTEGER NOT NULL REFERENCES proyectos(id) ON DELETE CASCADE,
  tecnologia_id INTEGER NOT NULL REFERENCES tecnologias(id) ON DELETE CASCADE,
  PRIMARY KEY (proyecto_id, tecnologia_id)
);

CREATE TABLE articulos (
  id              SERIAL PRIMARY KEY,
  slug            VARCHAR(100) NOT NULL UNIQUE,
  titulo          VARCHAR(150) NOT NULL,
  resumen         VARCHAR(300) NOT NULL,
  contenido_md    TEXT         NOT NULL,
  etiquetas       TEXT[]       NOT NULL DEFAULT '{}',
  minutos_lectura SMALLINT     NOT NULL DEFAULT 5,
  publicado       BOOLEAN      NOT NULL DEFAULT FALSE,
  fecha           DATE         NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE testimonios (
  id       SERIAL PRIMARY KEY,
  nombre   VARCHAR(100) NOT NULL,
  cargo    VARCHAR(120) NOT NULL,
  relacion VARCHAR(30)  NOT NULL CHECK (relacion IN ('docente', 'estudiante', 'cliente', 'companero')),
  texto    TEXT         NOT NULL,
  aprobado BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE mensajes (
  id      SERIAL PRIMARY KEY,
  nombre  VARCHAR(80)  NOT NULL,
  correo  VARCHAR(120) NOT NULL,
  asunto  VARCHAR(120),
  mensaje TEXT         NOT NULL,
  leido   BOOLEAN      NOT NULL DEFAULT FALSE,
  fecha   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_proyectos_destacado ON proyectos (destacado);
CREATE INDEX idx_articulos_publicado ON articulos (publicado, fecha DESC);
CREATE INDEX idx_mensajes_fecha ON mensajes (fecha DESC);
