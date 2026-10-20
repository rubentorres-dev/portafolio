module.exports = (req, res) => res.status(404).json({ ok: false, mensaje: `Ruta no encontrada: ${req.originalUrl}` });
