/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noche: { DEFAULT: '#05051A', 2: '#0A0A24', 3: '#120F45' },
        indigo: { electrico: '#4F46E5' },
        violeta: { DEFAULT: '#7C3AED', brillo: '#A78BFA', claro: '#C4B5FD' },
        texto: { DEFAULT: '#F5F5FA', suave: '#8B8BA7' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { ancho: '0.3em' },
      borderRadius: { tarjeta: '28px' },
    },
  },
  plugins: [],
};
