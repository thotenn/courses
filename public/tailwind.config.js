module.exports = {
  //purge: ['./src/**/*.{js,jsx,ts,tsx}', './dist/build/index.html'],
  purge: {
    enabled: true,
    content: ['./src/**/*.{js,jsx,ts,tsx}', './dist/index.html']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      primarytitle: ['Mochiy Pop P One', 'sans-serif'],
      craftygirl: ['Crafty Girls', 'cursive'],
      primarydesc: ['Dongle', 'sans-serif']
    },
    rotate: {
      '-180': '-180deg',
        '-90': '-90deg',
       '-45': '-45deg',
        '0': '0',
        '45': '45deg',
        '90': '90deg',
       '135': '135deg',
        '180': '180deg',
       '270': '270deg',
       '405': '405deg'
    },
    extend: {
      colors: {
        primary: {
          hover: '#FBCFE8',
          DEFAULT: '#F9A8D4',
          contrast: '#f8f9fa',
          light: '#fff'
        },
        secondary: {
          DEFAULT: "#007bff"
        },
        footer: {
          secondary: "#232323",
          primary: "#181818"
        }
      },
      width: {
        'screen-almost': '90vw'
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus'],
      height: ['hover', 'focus'],
      position: ['hover', 'focus'],
      rotate: ['active', 'group-hover'],
      transitionDelay: ['hover', 'focus'],
    },
  },
  plugins: [],
}
