import { describe, it, expect } from 'vitest';
import { validar } from '../src/sections/Contact';

describe('Validación del formulario de contacto', () => {
  const ok = { nombre: 'Ana', correo: 'ana@empresa.com', asunto: '', mensaje: 'Quiero una página web.', aceptaTerminos: true, aceptaPrivacidad: true };

  it('acepta datos válidos', () => {
    expect(validar(ok)).toEqual({});
  });

  it('marca correo inválido', () => {
    expect(validar({ ...ok, correo: 'ana@' })).toHaveProperty('correo');
  });

  it('exige aceptar la política de privacidad', () => {
    expect(validar({ ...ok, aceptaPrivacidad: false })).toHaveProperty('aceptaPrivacidad');
  });

  it('exige aceptar los términos por separado', () => {
    expect(validar({ ...ok, aceptaTerminos: false })).toHaveProperty('aceptaTerminos');
    expect(validar({ ...ok, aceptaTerminos: false })).not.toHaveProperty('aceptaPrivacidad');
  });

  it('marca mensaje corto y nombre vacío', () => {
    const e = validar({ ...ok, nombre: '', mensaje: 'Hola' });
    expect(e).toHaveProperty('nombre');
    expect(e).toHaveProperty('mensaje');
  });
});
