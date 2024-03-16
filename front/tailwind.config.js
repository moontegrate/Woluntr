/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#2DD1AA',
        'volunteer-color': '#ABB8EE',
        'main-accent-color': '#c0fce1',
        'main-accent-hover': '#d7fbec',
        'volunteer-accent-color': '#c0fce1',
        'volunteer-accent-hover': '#d7fbec'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

