// Pruebas del aviso por WhatsApp con Whapi (sin llamar a Whapi ni a la base de datos).
jest.mock('../src/models/mensaje.model', () => ({
  reservarAvisoWhatsapp: jest.fn(),
  liberarAvisoWhatsapp: jest.fn(async () => {}),
}));

const env = require('../src/config/env');
const Mensaje = require('../src/models/mensaje.model');
const { armarTexto, configurado, notificarMensaje } = require('../src/services/whapi.service');

const datos = { nombre: 'Ana', correo: 'ana@empresa.com', asunto: 'Web', mensaje: 'Quiero una página.' };

describe('Aviso por WhatsApp (Whapi)', () => {
  afterEach(() => {
    Object.assign(env, { WHAPI_TOKEN: '', WHAPI_DESTINO: '' });
    jest.restoreAllMocks();
    Mensaje.reservarAvisoWhatsapp.mockReset();
    Mensaje.liberarAvisoWhatsapp.mockClear();
  });

  const configurar = () => Object.assign(env, { WHAPI_TOKEN: 't', WHAPI_DESTINO: '573000000000' });

  it('arma un texto corto, sin enlaces', () => {
    const t = armarTexto({ ...datos, mensaje: 'x'.repeat(1000) });
    expect(t).toContain('Ana');
    expect(t).not.toContain('ana@empresa.com'); // el punto se cambia para que no sea enlace
    expect(t.length).toBeLessThan(450);
  });

  it('no envía nada si no está configurado', async () => {
    expect(configurado()).toBe(false);
    await expect(notificarMensaje(1, datos)).resolves.toBe(false);
    expect(Mensaje.reservarAvisoWhatsapp).not.toHaveBeenCalled();
  });

  it('no envía si se alcanzó el límite del día', async () => {
    configurar();
    Mensaje.reservarAvisoWhatsapp.mockResolvedValue(false);
    const f = jest.spyOn(global, 'fetch');
    await expect(notificarMensaje(1, datos)).resolves.toBe(false);
    expect(f).not.toHaveBeenCalled();
  });

  it('envía cuando hay cupo y libera el cupo si falla', async () => {
    configurar();
    Mensaje.reservarAvisoWhatsapp.mockResolvedValue(true);
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: true });
    await expect(notificarMensaje(1, datos)).resolves.toBe(true);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(notificarMensaje(2, datos)).rejects.toThrow('500');
    expect(Mensaje.liberarAvisoWhatsapp).toHaveBeenCalledWith(2);
  });
});
