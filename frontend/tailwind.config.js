/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [
        {
            pattern:
                /(bg|text|border)-(primary|secondary|accent|gray|slate|zinc|neutral|stone|red|orange|yellow|green|blue|indigo|elevation)-(50|100|200|300|400|500|600|700|800|900)/,
        },
    ],
    plugins: [],
    darkMode: 'class',
}
