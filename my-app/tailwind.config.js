/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",      // main app file
    "./app/**/*.{js,jsx,ts,tsx}", // Expo Router screens
    "./components/**/*.{js,jsx,ts,tsx}", // all components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
