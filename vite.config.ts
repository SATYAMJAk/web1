import path from "path"
const __dirname = import.meta.dirname
import { defineConfig } from "vite"

// Minimal dev config - bypasses missing packages and babel issues
export default defineConfig({
  plugins: [],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@contracts": path.resolve(__dirname, "./contracts"),
      "@db": path.resolve(__dirname, "./db"),
      "db": path.resolve(__dirname, "./db"),
    },
  },
  envDir: path.resolve(__dirname),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  }
});
