const { Router } = require('express');
const ctrl = require('../controllers/github.controller');

const router = Router();
router.get('/stats', ctrl.stats);
module.exports = router;
