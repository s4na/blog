import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'posts/*.md',
          dest: 'posts'
        },
        {
          src: 'posts/index.json',
          dest: 'posts'
        }
      ]
    })
  ],
  base: '/blog/',
})
