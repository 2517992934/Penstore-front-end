import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'
let timeStamp = new Date().getTime();


// https://vite.dev/config/
export default defineConfig({
  configureWebpack: {
    output: { // 输出 添加时间戳到打包编译后的js文件名称
      filename: `static/js/js[name].${timeStamp}.js`,
      chunkFilename: `static/js/chunk.[id].${timeStamp}.js`,
    }
  },
  css: {
    extract: { // 添加时间戳到打包后css文件名称
      filename: `static/css/[name].${timeStamp}.css`,
      chunkFilename: `static/css/chunk.[id].${timeStamp}.css`,
    }
  },

  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        // home: resolve(__dirname, 'index.html'),
        goods: resolve(__dirname, 'goods.html'),

        user: resolve(__dirname, 'user.html'),

        cart: resolve(__dirname, 'cart.html'),

        home: resolve(__dirname, 'home.html'),

        mypage:resolve(__dirname, 'home.html'),



      }

    }
  },
  //跨域请求
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api/, '')
  //     }
  //   },
  // }
})
