// vite.config.ts
import { defineConfig } from "vite";
export default defineConfig({
  // config options
  server: {
    fs: {
      // Allow serving files outside of the root
      allow: ["../.."],
    },
  },
  optimizeDeps: {
    exclude: ["@babylonjs/havok"],
    esbuildOptions: {
      target: "esnext",
      supported: {
        'top-level-await': true //browsers can handle top-level-await features
        }
    },
  },
  build: {
    target: "esnext",
  },
  esbuild: {
    target: "esnext",
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
      }
  },
});