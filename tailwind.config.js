/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#666666', // Default primary color
                    light: '#ebebeb', // Optional: lighter shade
                    dark: '#212121', // Optional: darker shade
                },
                secondary: {
                    DEFAULT: '#c2c2c2', // Default primary color
                    light: '#ebebeb', // Optional: lighter shade
                    dark: '#c4c4c4', // Optional: darker shade
                },
            },
        },
    },
    plugins: [],
};
