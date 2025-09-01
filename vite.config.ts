import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/auto-suggest-app/",
  define: {
    "process.env": process.env,
  },
  server: {
    host: "localhost",
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/styles/main.scss";
          @import "bootstrap/dist/css/bootstrap.min.css";
        `
      }
    }
  }
});
