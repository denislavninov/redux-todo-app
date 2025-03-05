import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Make env variables available in your client code
    // No need for process.env as Vite uses import.meta.env
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"],
          firebase: ["firebase/app", "firebase/firestore"],
          auth: ["@auth0/auth0-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
