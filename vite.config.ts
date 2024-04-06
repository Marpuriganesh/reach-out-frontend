import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // devOptions: {
      //   enabled: true
      // },
      includeAssets: ["reach_out_hand_logo.svg", "reach_out_hand_logo.png"],
      manifest: {
        name: "Reach Out",
        short_name: "Reach Out",
        description:
          "Reach Out is a platform for people to connect with each other.",
        theme_color: "#33cfff",
        background_color: "#33cfff",
        display: "standalone",
        icons: [
          {
            src: "reach_out_hand_logo.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "reach_out_hand_logo.png",
            sizes: "any",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
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
