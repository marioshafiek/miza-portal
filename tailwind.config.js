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
      // Mirror Quasar's brand colors so Tailwind utilities stay consistent
      colors: {
        primary: '#1976D2',
        secondary: '#26A69A',
        accent: '#9C27B0',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037',
        dark: '#1D1D1D',
        'dark-page': '#121212',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
