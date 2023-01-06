import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
const useDevMode = true 

// https://vitejs.dev/config/
export default ({ mode }) => {
  console.log("app2 mode:", mode)
  const isDev = mode == 'development'

  const env=loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [vue(),qiankun("app1",{useDevMode })],
    resolve: {
      extensions: [".mjs", ".js", ".jsx", ".json", ".vue"],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    base: isDev ? '/' : '/',
    server: {
      port: 5175
    },
    build: {
      target: "esnext",
      outDir: "app2"
    },
    output: {
      library: `app2-app2`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_app2`,
    }
  })
}


