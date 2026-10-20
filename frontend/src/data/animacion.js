// Configuración común de las animaciones al entrar en pantalla.
// once: false → la animación se repite CADA VEZ que la sección vuelve a verse
// (al salir de pantalla los elementos se ocultan y esperan su turno).
// amount: 0.2 → se activa cuando se ve el 20 % del elemento.
export const VISTA = { once: false, amount: 0.2 };
export const SUAVE = [0.22, 1, 0.36, 1]; // curva tipo Apple
