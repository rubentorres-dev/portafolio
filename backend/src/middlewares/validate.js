// Valida req.body con un esquema Zod; si falla responde 400 con los errores.
const validate = (schema) => (req, res, next) => {
  const r = schema.safeParse(req.body);
  if (!r.success) {
    const errores = r.error.issues.map((i) => ({ campo: i.path.join('.'), mensaje: i.message }));
    return res.status(400).json({ ok: false, mensaje: 'Datos inválidos', errores });
  }
  req.body = r.data;
  next();
};
module.exports = validate;
