// Agrupa todas las rutas bajo /api
const { Router } = require('express');

const router = Router();
router.get('/salud', (req, res) => res.json({ ok: true, servicio: 'portafolio-api', hora: new Date().toISOString() }));
router.use('/proyectos', require('./proyectos.routes'));
router.use('/articulos', require('./articulos.routes'));
router.use('/testimonios', require('./testimonios.routes'));
router.use('/github', require('./github.routes'));
router.use('/contacto', require('./contacto.routes'));
module.exports = router;
