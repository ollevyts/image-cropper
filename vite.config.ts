import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig(({ command }) => {
    return {
        plugins: [
            vue(),
            vuetify({
                autoImport: true,
            })
        ],
        base: command === 'build' ? '/image-cropper/' : '/',
    }
})