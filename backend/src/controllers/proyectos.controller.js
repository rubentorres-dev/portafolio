// CONTROLADOR: recibe la petición, llama al modelo y responde JSON.
const Proyecto = require('../models/proyecto.model');
const HttpError = require('../utils/httpError');

async function listar(req, res, next) {
  try {
    const { lenguaje, nivel, destacado } = req.query;
    const data = await Proyecto.listar({ lenguaje, nivel, destacado: destacado === 'true' });
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

async function detalle(req, res, next) {
  try {
    const data = await Proyecto.obtenerPorSlug(req.params.slug);
    if (!data) throw new HttpError(404, 'Proyecto no encontrado');
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

module.exports = { listar, detalle };
