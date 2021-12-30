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
          primary: '#fef9f3',
          secondary: '#191818',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
