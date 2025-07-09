import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            // Your EcoSmart colors
            "true-blue": "#0053E2",
            "spark-yellow": "#FFC220",
            "bentonville-blue": "#001E60",
            "sky-blue": "#A9DDF7",
            "everyday-blue": "#4DBDF5",
          }
        }
      }
    }),
  ],
})