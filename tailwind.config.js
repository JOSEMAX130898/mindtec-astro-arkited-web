/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'moradoArk': '#262626',
        'moradoArk-light': '#900DFF',
        'verdeArk': '#00BA3C',
        'verdeArk-light': '#e6f7ed',
        'verdeEvento': '#108414',
      },
      fontFamily: {
        'sans': ['AkiraExpandedDemo', 'sans-serif'],
        'akira': ['AkiraExpandedDemo', 'sans-serif'],
        'akira-book': ['AkiraExpandedDemo', 'sans-serif'],
        'akira-medium': ['AkiraExpandedDemo', 'sans-serif'],
        'akira-bold': ['AkiraExpandedDemo', 'sans-serif'],
        'archivo': ['ArchivoNarrow', 'sans-serif'],
        'archivo-regular': ['ArchivoNarrow', 'sans-serif'],
        'bebas': ['BebasNeue', 'sans-serif'],
        'bebas-regular': ['BebasNeue', 'sans-serif'],
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.05)' },
          '50%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        heartbeatStrong: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1.3)' },
          '75%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1.3s infinite',
        heartbeatStrong: 'heartbeatStrong 1.3s infinite',
      },
    },
  },
  plugins: [],
}

