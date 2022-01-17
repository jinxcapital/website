module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        tint: {
          primary: '#fcf9f7',
          secondary: '#000000',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
