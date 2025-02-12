import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
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
        target: "BE_URL",
        changeOrigin: true,
        secure: false,
      },
      "/accounts": {
        target: "BE_URL",
        changeOrigin: true,
        secure: false,
      },
      "/media": {
        target: "BE_URL",
        changeOrigin: true,
        secure: false,
      },
      "/connectors/": {
        target: "BE_URL",
        changeOrigin: true,
        secure: false,
      },
      "/pb/": {
        target: "BE_URL",
        changeOrigin: true,
        secure: false,
      },
      "/executor/": {
        target: "BE_URL",
        changeOrigin: true,
        secure: false,
      },
      "/management": {
        target: "BE_URL",
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
