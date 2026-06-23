/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  prefix: 'tw-',

  // Disable Preflight to prevent conflicts with Quasar's Material Design baseline styles
  corePlugins: {
    preflight: false,
  },

  darkMode: 'class', // Synced with Quasar's $q.dark toggle

  theme: {
    extend: {
      // ── Miza brand palette (see brand-indentity/MIZA-BRAND.md) ──────────────
      colors: {
        // Quasar-aligned semantic tokens
        primary: '#D6262C',   // Miza Red
        secondary: '#F5C518', // Miza Gold
        accent: '#F5C518',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F5C518',
        dark: '#1F1D1A',       // Ink
        'dark-page': '#161412',

        // Miza brand scale
        miza: {
          red: '#D6262C',
          'red-dark': '#B71E23',
          'red-tint': '#FBE9E9',
          gold: '#F5C518',
          ink: '#1F1D1A',
          'ink-60': '#55524C',
          'ink-40': '#8A8780',
          paper: '#FBFAF8',
          white: '#FFFFFF',
          border: '#ECEAE5',
        },
      },
      fontFamily: {
        // Body / UI
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Display / Headings + logo-style text
        display: ['"Baloo 2"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'miza-sm': '8px',
        'miza-md': '14px',
        'miza-lg': '24px',
        'miza-pill': '999px',
      },
      boxShadow: {
        'miza-sm': '0 1px 3px rgba(31,29,26,.08)',
        'miza-md': '0 4px 14px rgba(31,29,26,.10)',
        'miza-lg': '0 10px 30px rgba(31,29,26,.12)',
      },
      screens: {
        xs: '480px',
        sm: '600px',
        md: '1024px',
        lg: '1440px',
        xl: '1920px',
      },
    },
  },

  plugins: [],
}
