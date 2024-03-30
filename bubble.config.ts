import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "public",
    emptyOutDir: false,
    assetsDir: "static",
    rollupOptions: {
      input: {
        embed: resolve(__dirname, "bubble/main.tsx"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          const isEntry = chunkInfo.isEntry;
          // return chunkInfo.name === 'embed' ? '[name].min.js' : '[name].js';
          return isEntry ? "[name].bubble.js" : "[name]-[hash].js";
        },
      },
    },
  },
});
