// Textos EXACTOS de las autorizaciones que la persona acepta en el formulario, por versión.
// Se guardan junto a cada registro de consentimiento (prueba de la autorización ante la SIC,
// Decreto 1074 de 2015, art. 2.2.2.25.2.5). Si cambias los documentos legales:
//   1) agrega una versión NUEVA aquí (no borres las anteriores),
//   2) cambia VERSION_LEGAL en frontend/src/data/legal.js.
const VERSIONES = {
  '2026-10-21': {
    terminos: 'He leído y acepto los términos y condiciones.',
    privacidad: 'Autorizo de forma previa, expresa e informada el tratamiento de mis datos personales para responder mi mensaje, según la política de privacidad (Ley 1581 de 2012).',
    urlTerminos: 'https://rubentorres-dev.vercel.app/terminos',
    urlPrivacidad: 'https://rubentorres-dev.vercel.app/privacidad',
  },
};

const VERSION_ACTUAL = '2026-10-21';

module.exports = { VERSIONES, VERSION_ACTUAL };
