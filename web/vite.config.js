import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.devconfig/
export default defineConfig({
  base: "/",
  server: {
    port: 9235,
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    cors: true,
    // hmr: {
    //   clientPort: 9235,
    // },
    hrm: false,
    allowedHosts: true,
    proxy: {
      "/e/": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
      "/accounts": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
      "/media": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
      "/connectors/": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
      "/pb/": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
      "/executor/": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
      "/management": {
        target: "https://glowing-fortnight-qgq6j5r55prc4vg-8080.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
  ],
});
