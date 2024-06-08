/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                "custom-svg": "url('/src/imgs/1482678.svg')",
            },
        },
    },
    plugins: [],
};
