// Pruebas de la API de proyectos con el modelo simulado (no necesita base de datos).
const request = require('supertest');

jest.mock('../src/models/proyecto.model', () => ({
  listar: jest.fn(async () => [{ id: 1, slug: 'sgis', titulo: 'SGIS', tecnologias: ['Java', 'MySQL'] }]),
  obtenerPorSlug: jest.fn(async (slug) => (slug === 'sgis' ? { id: 1, slug: 'sgis', titulo: 'SGIS' } : null)),
}));

const app = require('../src/app');
const Proyecto = require('../src/models/proyecto.model');

describe('GET /api/proyectos', () => {
  it('lista los proyectos', async () => {
    const res = await request(app).get('/api/proyectos');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.data).toHaveLength(1);
  });

  it('pasa los filtros al modelo', async () => {
    await request(app).get('/api/proyectos?lenguaje=java&nivel=1');
    expect(Proyecto.listar).toHaveBeenLastCalledWith({ lenguaje: 'java', nivel: '1', destacado: false });
  });

  it('devuelve el detalle por slug', async () => {
    const res = await request(app).get('/api/proyectos/sgis');
    expect(res.status).toBe(200);
    expect(res.body.data.titulo).toBe('SGIS');
  });

  it('responde 404 si el proyecto no existe', async () => {
    const res = await request(app).get('/api/proyectos/no-existe');
    expect(res.status).toBe(404);
  });
});

describe('Rutas generales', () => {
  it('GET /api/salud responde ok', async () => {
    const res = await request(app).get('/api/salud');
    expect(res.body.ok).toBe(true);
  });

  it('ruta inexistente responde 404', async () => {
    const res = await request(app).get('/api/nada');
    expect(res.status).toBe(404);
  });
});
