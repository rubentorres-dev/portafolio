// Evita que la página se amplíe o aleje con gestos en celulares y tablets (sobre todo iPhone/iPad,
// donde Safari ignora "user-scalable=no"). El desplazamiento normal con un dedo sigue funcionando.
export function bloquearZoom() {
  if (typeof window === 'undefined') return;
  const parar = (e) => e.preventDefault();

  // Safari (iOS): gestos de pellizcar
  ['gesturestart', 'gesturechange', 'gestureend'].forEach((t) => document.addEventListener(t, parar, { passive: false }));

  // Dos o más dedos moviéndose = intento de zoom
  document.addEventListener('touchmove', (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });

  // El doble toque para ampliar lo bloquea el CSS (touch-action: pan-x pan-y en <html>).

  // Trackpad (pellizco = rueda con Ctrl) en tablets y portátiles táctiles
  window.addEventListener('wheel', (e) => { if (e.ctrlKey && navigator.maxTouchPoints > 0) e.preventDefault(); }, { passive: false });
}
