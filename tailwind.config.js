module.exports = {
  content: ["./src/**/*.{html,njk,js}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        logo: ["Bespoke Stencil", 'Roboto'],
        hero: ['Panchang', 'Roboto']
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
// font-family: 'Panchang', sans-serif;
// font-family: 'Bespoke Stencil', sans-serif;