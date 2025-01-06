import fluidTypography from "tailwind-fluid-typography";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [fluidTypography],
};
