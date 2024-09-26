import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string; }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    server: {
      port: Number(env.VITE_PORT),
    },
    plugins: [react()],
  });

}