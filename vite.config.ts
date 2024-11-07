import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    proxy: {
      "/api/brutus": {
        target: process.env.VITE_API_DEBIAS_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/brutus/, ""),
      },
      "/api/debias": {
        target: process.env.VITE_API_BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/debias/, ""),
      },
    },
    host: "localhost",
    port: 3000,
    open: true,
  },
});
