/** @type {import('tailwindcss').Config} */
const color = require('./src/shared/styles/color');
const screens = require('./src/shared/styles/screens');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: screens,
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
      boxShadow: {
        'elevation-3': '0px 0px 14px 0px #00000021',
        'elevation-4': '0px 5px 18px 0px #0000004D',
      },
      transitionProperty: {
        'height': 'height'
      }
    }
  },
  plugins: [],
}
