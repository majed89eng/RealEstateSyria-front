/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        alexandria: ['Alexandria', 'sans-serif'],
      },
      colors: {
        syria: {
          green: {
            DEFAULT: '#059669',
            light: '#10b981',
            dark: '#047857',
            50: '#ecfdf5',
          },
          gold: {
            DEFAULT: '#d97706',
            light: '#f59e0b',
            dark: '#b45309',
          },
          dark: {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
          }
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
