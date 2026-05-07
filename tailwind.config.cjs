/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pastelOrange: {
          DEFAULT: '#FFB877', // Laranja Pastel
          light: '#FFD8B2',
          dark: '#E09A4A',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
