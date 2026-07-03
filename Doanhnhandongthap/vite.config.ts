import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Bắt buộc phải có dòng này

export default defineConfig({
  plugins: [react(), tailwindcss()], // <-- Bắt buộc phải nhét tailwindcss() vào đây
})