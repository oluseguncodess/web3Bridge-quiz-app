/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': "'Poppins', sans-serif" 
      },
      boxShadow: {
        'bt': '0px 3px 5px 1px rgba(0, 0, 0, 0.1)'
      },
    },
  },
  plugins: [],
}