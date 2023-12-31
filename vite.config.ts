import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import handlebars from 'vite-plugin-handlebars'

// https://vitejs.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [
    vue(),
    handlebars({
        partialDirectory: resolve(__dirname, 'src', 'partials'),
    })
  ],
  root: "htdocs",
  css: {
    preprocessorOptions: {
        less: {
            math: "always",
            relativeUrls: true,
            javascriptEnabled: true,
        }
    }
  },
  resolve: {
    alias: {
      '/src': resolve(process.cwd(), 'src'),
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '@style': resolve(__dirname, 'src', 'style'),
      '@components': resolve(__dirname, 'src', 'components'),
    }
  },
  base: './',
  build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        external: [/^\/i\//, /^\/FUMBBL\//],
        input: {
            winrater: resolve(__dirname, 'htdocs', 'winrater.html')
        },
        output: {
          format: 'esm',
          entryFileNames: 'entries/[name].js',
          chunkFileNames: 'chunks/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
  }
})
