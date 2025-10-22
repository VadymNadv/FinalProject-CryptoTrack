// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const repoName = 'FinalProject-CryptoTrack';

export default defineConfig({
    plugins: [react(), tailwindcss()],

    base: `/${repoName}/`,
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist'
    }
})