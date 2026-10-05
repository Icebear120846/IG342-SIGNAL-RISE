import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/IG342-SIGNAL-RISE/' : '/',
  plugins: [react()],
}))
