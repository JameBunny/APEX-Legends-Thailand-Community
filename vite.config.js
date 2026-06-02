import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// เปลี่ยน 'YOUR_REPOSITORY_NAME' เป็นชื่อคลังเก็บโค้ดของคุณบน GitHub เช่น 'apex-thailand'
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/APEX-Legends-Thailand-Community/' : '/',
})
