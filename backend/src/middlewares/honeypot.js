// Si un bot llena el campo oculto "sitio_web", fingimos éxito y no guardamos nada.
module.exports = (req, res, next) => {
  if (req.body && req.body.sitio_web) {
    return res.status(201).json({ ok: true, mensaje: 'Mensaje enviado' });
  }
  next();
};
