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
                'volunteer-color-dark': '#7f91d0',
                'main-accent-color': '#c0fce1',
                'main-accent-hover': '#d7fbec',
                'volunteer-accent-color': '#d9e0ff',
                'volunteer-accent-hover': '#e9eeff',
                'neutral-color': '#ffffff',
                'neutral-accent-color': '#F9F9F9'
            }
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
}

