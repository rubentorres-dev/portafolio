const github = require('../services/github.service');
const HttpError = require('../utils/httpError');

async function stats(req, res, next) {
  try {
    res.json({ ok: true, data: await github.obtenerEstadisticas() });
  } catch (e) {
    next(new HttpError(502, 'No se pudo consultar GitHub en este momento'));
  }
}

module.exports = { stats };
