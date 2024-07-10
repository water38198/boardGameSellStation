import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return{
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__ : 'true',
  },
  plugins: [
    vue(),
    ],
  base:mode === 'production' ? '/boardGameSellStation/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}

} )
