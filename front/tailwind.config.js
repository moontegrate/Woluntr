/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#47EEA8',
        'main-color-hover': '#43E19F'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

