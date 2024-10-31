import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // host: "10.8.58.26", // 网页的ip地址，如果没有就是localhost或127.0.0.1
    port: 8080          // 网页的端口, 如果没有就是随机端口
  }

})
