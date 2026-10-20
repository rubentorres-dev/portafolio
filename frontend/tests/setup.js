import '@testing-library/jest-dom/vitest';

// jsdom no trae estas APIs del navegador; las simulamos.
window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }));
class IO { observe() {} unobserve() {} disconnect() {} }
window.IntersectionObserver = window.IntersectionObserver || IO;
