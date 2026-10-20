import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En producción: quita console.log, debugger y comentarios del código publicado.
  esbuild: mode === 'production' ? { drop: ['console', 'debugger'], legalComments: 'none' } : {},
  server: { port: 5173 },
  build: {
    // Código publicado minificado, sin mapas de código fuente (el navegador no puede reconstruir los archivos originales).
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Nombres de archivo sin pistas de la estructura del proyecto
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
        // Separa las librerías grandes para que el sitio cargue más rápido.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          animacion: ['framer-motion', 'gsap', 'lenis', 'cobe'],
          markdown: ['react-markdown'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
}));
