import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import autoImport from 'unplugin-auto-import/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    autoImport({imports: ['vue']}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 8088,
    proxy: {
      '/dev-api': {
        target: 'http://vue.ruoyi.vip',
        changeOrigin: true,
        rewrite : (p) => p.replace(/^\/dev-api/, 'prod-api')
      }
    }
  },
})
