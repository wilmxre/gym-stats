/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(({ command }) => ({
  plugins: [react(), tsconfigPaths()],
  base: command === 'build' ? '/gym-stats/' : '/',
  server: {
    allowedHosts: ['1c44afcb0c6b.ngrok-free.app']
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/setup',
    include: ['**/test.{ts,tsx}']
  }
}))
