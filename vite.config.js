import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext', // This ensures compatibility with modern JavaScript features like top-level await
    },
});
