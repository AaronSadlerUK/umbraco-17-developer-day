import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/manifests.ts", // Bundle registers one or more manifests
      formats: ["es"],
      fileName: "demo-backoffice",
    },
    outDir: "../wwwroot/App_Plugins/DemoBackoffice", // your web component will be saved in this location
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});