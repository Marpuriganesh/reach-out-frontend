import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        // enabled: true,
        type: "module",
      },
      includeAssets: [
        "hand.svg",
        "hand.png",
        "reach_out_horizontal_white.svg",
        "reach_out_hand_logo.png",
        "reach_out_hand_logo_apple.png",
      ],
      manifest: {
        name: "Reach Out",
        short_name: "Reach Out",
        description:
          "Reach Out is a platform for people to connect with each other.",
        theme_color: "#050505",
        // background_color: "#33cfff",
        display: "standalone",
        icons: [
          {
            src: "hand.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "hand.png",
            sizes: "any",
            type: "image/png",
            purpose: "any",
          },
        ],
        orientation: "portrait",
      },
      // injectRegister: null,
      strategies: "injectManifest",
      filename: "sw.ts",
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    sourcemap: true,
  },
  base: "/",
});
