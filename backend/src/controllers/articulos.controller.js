const Articulo = require('../models/articulo.model');
const HttpError = require('../utils/httpError');

async function listar(req, res, next) {
  try { res.json({ ok: true, data: await Articulo.listar() }); } catch (e) { next(e); }
}

async function detalle(req, res, next) {
  try {
    const data = await Articulo.obtenerPorSlug(req.params.slug);
    if (!data) throw new HttpError(404, 'Artículo no encontrado');
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

module.exports = { listar, detalle };
