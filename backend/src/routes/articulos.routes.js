const { Router } = require('express');
const ctrl = require('../controllers/articulos.controller');

const router = Router();
router.get('/', ctrl.listar);
router.get('/:slug', ctrl.detalle);
module.exports = router;
