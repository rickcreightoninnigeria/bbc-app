/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './constants/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Paper / ink — matches the "Make Many Deep Disciples" reference doc
        bg: { DEFAULT: '#F3F4EC', dark: '#1B1915' },
        surface: { DEFAULT: '#FFFFFF', dark: '#232019' },
        ink: { DEFAULT: '#262320', dark: '#ECE6D8' },
        'ink-soft': { DEFAULT: '#5C564C', dark: '#B5AC99' },
        'ink-faint': { DEFAULT: '#948D7D', dark: '#7D7566' },
        rule: { DEFAULT: '#DDD8CB', dark: '#3A362C' },
        utility: { DEFAULT: '#EAE7DB', dark: '#262319' },

        // Pillar accents — one per "Make Many Deep Disciples" section
        make: { DEFAULT: '#A5761F', dark: '#DDA748' },
        many: { DEFAULT: '#2F6B47', dark: '#66B385' },
        deep: { DEFAULT: '#8C5A38', dark: '#C68A5F' },
        disciples: { DEFAULT: '#34527C', dark: '#86A4D1' },
      },
    },
  },
  plugins: [],
};
