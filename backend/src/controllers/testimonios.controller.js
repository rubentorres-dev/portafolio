const Testimonio = require('../models/testimonio.model');

async function listar(req, res, next) {
  try { res.json({ ok: true, data: await Testimonio.listarAprobados() }); } catch (e) { next(e); }
}

module.exports = { listar };
