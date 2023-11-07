/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  mode: "jit",
  theme: {
    extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      borderWidth: {
        '20': '20px',
        '50': '50px',
      },
      width: {
        '160': '160px',
        '250': '250px',
        '300': '300px',
      },
      height: {
        '300': '300px',
        '400': '400px',
        '500': '500px',
        '650': '650px',
        '800': '800px',

      },
      maxHeight: {
        '400': '400px',
        '650': '650px',
        '750': '750px',
      },
    },
  },
  plugins: [],
}

