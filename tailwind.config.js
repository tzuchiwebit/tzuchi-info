/** @type {import('tailwindcss').Config} */
const color = require('./src/shared/styles/color');
const screens = require('./src/shared/styles/screens');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // plugins: [
  //   require("flowbite/plugin")
  // ],
  theme: {
    screens: screens,
    // fontFamily: {
    // sans: ['Graphik', 'sans-serif'],
    // serif: ['Merriweather', 'serif'],
    // },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
        '5/4': '5 / 4',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: color,
      boxShadow: {
        'elevation-3': '0px 0px 7px 0px rgba(0, 0, 0, 0.13), 0px 4px 4px 0px rgba(0, 0, 0, 0.13)',
        'elevation-4': '0px 5px 18px 0px rgba(0, 0, 0, 0.30), 0px 4px 4px 0px rgba(0, 0, 0, 0.13)',
      },
      transitionProperty: {
        'height': 'height'
      }
    }
  },
  plugins: [],
}
