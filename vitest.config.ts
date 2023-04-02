import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      all: true,
      reporter: ['text', 'json', 'html'],
      exclude: [...configDefaults.exclude, 'src/types/**', 'src/constants/**', 'src/vite-env.d.ts'],
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
});
