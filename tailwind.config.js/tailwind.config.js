/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonBlue: '#00ccff',
        neonPurple: '#8b5cf6',
        darkBg: '#0b0f19'
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 204, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
