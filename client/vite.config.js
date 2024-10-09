import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Hecta.github.io/', // Asegúrate de que esta ruta coincida con el nombre de tu repositorio
})