import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: false,
    }),
  ],
  preview: {
    host: "0.0.0.0",
  },
  base: "./",
  build: {
    outDir: 'dist/pwa',
  }
})
