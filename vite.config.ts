import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

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
  ],
  preview: {
    host: "0.0.0.0",
  },
  base: "./",
})
