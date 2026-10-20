// Pruebas del formulario de contacto: validación, honeypot y guardado.
const request = require('supertest');

jest.mock('../src/models/mensaje.model', () => ({ crear: jest.fn(async () => ({ id: 7, fecha: new Date() })) }));
jest.mock('../src/services/email.service', () => ({ notificarMensaje: jest.fn(async () => true) }));
jest.mock('../src/services/telegram.service', () => ({ notificarMensaje: jest.fn(async () => true) }));
jest.mock('../src/services/whapi.service', () => ({ notificarMensaje: jest.fn(async () => true) }));

const app = require('../src/app');
const Mensaje = require('../src/models/mensaje.model');

const valido = { nombre: 'Ana Pérez', correo: 'ana@empresa.com', asunto: 'Proyecto web', mensaje: 'Hola, quiero una página web con base de datos.', acepta: true };

describe('POST /api/contacto', () => {
  beforeEach(() => Mensaje.crear.mockClear());

  it('envía los avisos por Telegram y WhatsApp', async () => {
    const telegram = require('../src/services/telegram.service');
    const whapi = require('../src/services/whapi.service');
    telegram.notificarMensaje.mockClear();
    whapi.notificarMensaje.mockClear();
    await request(app).post('/api/contacto').send(valido);
    expect(telegram.notificarMensaje).toHaveBeenCalledWith(expect.objectContaining({ correo: 'ana@empresa.com' }));
    expect(whapi.notificarMensaje).toHaveBeenCalledWith(7, expect.objectContaining({ correo: 'ana@empresa.com' }));
  });

  it('rechaza si no acepta la política de privacidad', async () => {
    const res = await request(app).post('/api/contacto').send({ ...valido, acepta: false });
    expect(res.status).toBe(400);
    expect(Mensaje.crear).not.toHaveBeenCalled();
  });

  it('guarda un mensaje válido', async () => {
    const res = await request(app).post('/api/contacto').send(valido);
    expect(res.status).toBe(201);
    expect(res.body.ok).toBe(true);
    expect(Mensaje.crear).toHaveBeenCalledTimes(1);
  });

  it('rechaza un correo inválido', async () => {
    const res = await request(app).post('/api/contacto').send({ ...valido, correo: 'no-es-correo' });
    expect(res.status).toBe(400);
    expect(res.body.errores[0].campo).toBe('correo');
  });

  it('rechaza un mensaje muy corto', async () => {
    const res = await request(app).post('/api/contacto').send({ ...valido, mensaje: 'Hola' });
    expect(res.status).toBe(400);
  });

  it('ignora a los bots que llenan el honeypot', async () => {
    const res = await request(app).post('/api/contacto').send({ ...valido, sitio_web: 'http://spam.com' });
    expect(res.status).toBe(201);
    expect(Mensaje.crear).not.toHaveBeenCalled();
  });
});

describe('Limpieza de datos (input sanitization)', () => {
  const { limpiar } = require('../src/validators/contacto.schema');

  it('quita etiquetas HTML y scripts', () => {
    expect(limpiar('<script>alert(1)</script>Hola <b>Ana</b>')).toBe('alert(1)Hola Ana');
  });

  it('guarda el mensaje ya limpio', async () => {
    Mensaje.crear.mockClear();
    await request(app).post('/api/contacto').send({ ...valido, nombre: '<i>Ana</i>', correo: 'ANA@Empresa.com' });
    expect(Mensaje.crear).toHaveBeenCalledWith(expect.objectContaining({ nombre: 'Ana', correo: 'ana@empresa.com' }));
  });
});
