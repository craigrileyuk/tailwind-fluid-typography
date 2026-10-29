import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "tailwind-fluid-typography": resolve("../"),
    },
  },
  plugins: [tailwindcss(), vue({})],
});
