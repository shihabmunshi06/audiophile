import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from 'url';
import autoprefixer from 'autoprefixer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "last 2 versions",
            "> 1%",
            "iOS >= 13",
            "Safari >= 13",
            "not dead"
          ]
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/a-sass/abstract.scss" as *;`
      }
    }
  }
})
