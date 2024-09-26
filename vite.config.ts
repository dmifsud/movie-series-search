import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string; }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    server: {
      port: Number(env.VITE_PORT),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@store": path.resolve(__dirname, "./src/store"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
  });

}