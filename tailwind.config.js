/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF9536',
          green: '#121A18',
          'support-green': '#73B839',
          cream: '#FFF8EA',
          charcoal: '#252525',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Noto Sans SC', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'Noto Sans SC', 'sans-serif'],
        body: ['Inter', 'Noto Sans SC', 'sans-serif'],
      },
      aspectRatio: {
        'product': '4 / 3',
        'hero': '16 / 9',
        'banner': '21 / 9',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(115,184,57,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(115,184,57,0.08)',
        'button': '0 4px 14px rgba(255,149,54,0.25)',
        'button-hover': '0 6px 20px rgba(255,149,54,0.35)',
        'dropdown': '0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
        'header': '0 2px 20px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
