// Caché en memoria con tiempo de expiración (TTL).
const store = new Map();

function get(key) {
  const item = store.get(key);
  if (!item) return null;
  if (Date.now() > item.expira) { store.delete(key); return null; }
  return item.valor;
}

function set(key, valor, ttlMs) {
  store.set(key, { valor, expira: Date.now() + ttlMs });
}

function clear() { store.clear(); }

module.exports = { get, set, clear };
