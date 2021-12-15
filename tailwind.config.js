module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        tint: {
          light: '#fef9f3',
          dark: '#191818',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
