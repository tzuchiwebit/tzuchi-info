/** @type {import('tailwindcss').Config} */
const color = require('./src/shared/styles/color');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // below 575px are using moblie design
      // mobile: '575px',
      tablet: '768px',
      laptop: '1024px',
      container: '1180px',
      desktop: '1600px',
    },
    // fontFamily: {
      // sans: ['Graphik', 'sans-serif'],
      // serif: ['Merriweather', 'serif'],
    // },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: color,
    }
  },
  plugins: [],
}
