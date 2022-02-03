const fluidTypography = require("./index.js");

module.exports = {
  content: ["./demo/index.html", "./demo/src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [fluidTypography],
};
