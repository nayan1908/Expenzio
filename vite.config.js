import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }) => {
  process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return defineConfig({
    plugins: [
      react(),
    ],
    server: {
      // port: process.env.VITE_PORT,
      host: true,
    },
  });
};
