const { Router } = require('express');
const ctrl = require('../controllers/proyectos.controller');

const router = Router();
router.get('/', ctrl.listar);          // GET /api/proyectos?lenguaje=java&nivel=1&destacado=true
router.get('/:slug', ctrl.detalle);    // GET /api/proyectos/sgis
module.exports = router;
