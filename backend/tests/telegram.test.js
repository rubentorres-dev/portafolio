// Pruebas del aviso por Telegram (sin llamar a Telegram).
const { armarTexto, configurado, notificarMensaje } = require('../src/services/telegram.service');

describe('Aviso por Telegram', () => {
  it('arma el texto con nombre, correo, asunto y mensaje', () => {
    const t = armarTexto({ nombre: 'Ana', correo: 'ana@empresa.com', asunto: 'Web', mensaje: 'Quiero una página.' });
    expect(t).toContain('Ana');
    expect(t).toContain('ana@empresa.com');
    expect(t).toContain('Web');
    expect(t).toContain('Quiero una página.');
  });

  it('recorta mensajes muy largos (límite de Telegram: 4096)', () => {
    const t = armarTexto({ nombre: 'Ana', correo: 'a@b.co', mensaje: 'x'.repeat(5000) });
    expect(t.length).toBeLessThan(4096);
  });

  it('no envía nada si no está configurado', async () => {
    expect(configurado()).toBe(false);
    await expect(notificarMensaje({ nombre: 'A', correo: 'a@b.co', mensaje: 'hola mundo' })).resolves.toBe(false);
  });
});
