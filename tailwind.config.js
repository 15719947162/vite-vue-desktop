/** @type {import('tailwindcss').Config} */

module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    content: [],
    theme: {
        screens: {
            sm: '976px',
            md: '1280px',
            lg: '1440px',
            xl: '1980px',
        },
        container: false,
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
