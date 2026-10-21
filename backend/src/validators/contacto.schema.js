// Reglas de validación y limpieza del formulario de contacto (Zod).
const { z } = require('zod');
const { VERSIONES } = require('../config/legal');

// Limpia el texto: quita etiquetas HTML, caracteres de control y espacios sobrantes.
const limpiar = (s) => s
  .replace(/<[^>]*>/g, '')
  // eslint-disable-next-line no-control-regex
  .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
  .replace(/[<>]/g, '')
  .trim();

const texto = (min, max, msgMin) => z.string().transform(limpiar).pipe(z.string().min(min, msgMin).max(max, `Máximo ${max} caracteres`));

const contactoSchema = z.object({
  nombre: texto(2, 80, 'El nombre es muy corto'),
  correo: z.string().trim().toLowerCase().email('Correo no válido').max(120),
  asunto: z.string().transform(limpiar).pipe(z.string().max(120)).optional(),
  mensaje: texto(10, 2000, 'El mensaje debe tener al menos 10 caracteres'),
  // Dos autorizaciones separadas: términos y tratamiento de datos (Ley 1581 de 2012).
  aceptaTerminos: z.literal(true, { errorMap: () => ({ message: 'Debes aceptar los términos y condiciones' }) }),
  aceptaPrivacidad: z.literal(true, { errorMap: () => ({ message: 'Debes autorizar el tratamiento de tus datos' }) }),
  // Versión de los documentos que la persona vio; debe ser una versión conocida.
  versionLegal: z.string().refine((v) => Object.hasOwn(VERSIONES, v), 'Versión de documentos no válida. Recarga la página.'),
});

module.exports = { contactoSchema, limpiar };
