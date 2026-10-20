const { Router } = require('express');
const ctrl = require('../controllers/contacto.controller');
const validate = require('../middlewares/validate');
const honeypot = require('../middlewares/honeypot');
const turnstile = require('../middlewares/turnstile');
const { contactoLimiter, contactoGlobalLimiter } = require('../middlewares/rateLimit');
const { contactoSchema } = require('../validators/contacto.schema');

const router = Router();
// Orden: límite por persona → límite general → trampa anti-bots → Turnstile → validación y limpieza → controlador
router.post('/', contactoLimiter, contactoGlobalLimiter, honeypot, turnstile, validate(contactoSchema), ctrl.enviar);
module.exports = router;
