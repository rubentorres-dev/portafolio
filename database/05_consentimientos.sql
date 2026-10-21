-- =========================================================
-- v33 · Registro de autorizaciones (Ley 1581 de 2012 y Decreto 1074 de 2015)
-- Guarda CUÁNDO y CÓMO cada persona aceptó los términos y autorizó el tratamiento
-- de sus datos, con el texto exacto y la versión de los documentos.
-- Se puede ejecutar varias veces sin dañar nada.
-- =========================================================
CREATE TABLE IF NOT EXISTS consentimientos (
  id                  SERIAL PRIMARY KEY,
  mensaje_id          INTEGER REFERENCES mensajes(id) ON DELETE SET NULL,
  correo              VARCHAR(120) NOT NULL,
  nombre              VARCHAR(80)  NOT NULL,
  acepta_terminos     BOOLEAN      NOT NULL,
  acepta_privacidad   BOOLEAN      NOT NULL,
  version_documentos  VARCHAR(20)  NOT NULL,
  texto_terminos      TEXT         NOT NULL,
  texto_privacidad    TEXT         NOT NULL,
  medio               VARCHAR(60)  NOT NULL DEFAULT 'formulario web',
  pagina              VARCHAR(255),
  ip                  VARCHAR(64),
  navegador           VARCHAR(300),
  aceptado_en         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_consentimientos_correo ON consentimientos (correo);
CREATE INDEX IF NOT EXISTS idx_consentimientos_fecha  ON consentimientos (aceptado_en);
