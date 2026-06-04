/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ critical — tells Tailwind where to scan
  ],
  theme: {
    extend: {
      fontFamily: {
        zeyada: ["Zeyada", "cursive"],
      }
    },
  },
  plugins: [],
}

