import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
    const env = loadEnv(mode, process.cwd());

    const productionConfig: { base?: string } = {};
    if (mode === 'production') {
        productionConfig['base'] =
            'https://dmifsud.github.io/movie-series-search';
    }

    return defineConfig({
        ...productionConfig,
        server: {
            port: Number(env.VITE_PORT),
        },
        test: {
            globals: true,
            environment: 'jsdom',
        },
        plugins: [react()],
        resolve: {
            alias: {
                '@api': path.resolve(__dirname, './src/api'),
                '@hooks': path.resolve(__dirname, './src/hooks'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@store': path.resolve(__dirname, './src/store'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@components': path.resolve(__dirname, './src/components'),
            },
        },
    });
};
