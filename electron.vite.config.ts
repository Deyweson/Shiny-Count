import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import commonjs from '@rollup/plugin-commonjs'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      commonjs({
        // Ignorar requires dinâmicos (útil para módulos nativos)
        ignoreDynamicRequires: true,

        // Definir módulos específicos para serem tratados como requires dinâmicos
        dynamicRequireTargets: [
          // Inclua o caminho para o seu módulo nativo aqui
          'C:/dev/Shiny-Count/build/node_sqlite3.node'
        ]
      })
    ]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
