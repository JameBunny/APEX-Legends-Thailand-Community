import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/APEX-Legends-Thailand-Community/', // ต้องมีบรรทัดนี้ และใส่ / หน้าหลังให้ครบ
})
