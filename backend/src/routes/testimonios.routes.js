const { Router } = require('express');
const ctrl = require('../controllers/testimonios.controller');

const router = Router();
router.get('/', ctrl.listar);
module.exports = router;
