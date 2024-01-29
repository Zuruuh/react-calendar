import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true, rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: '@zuruuh/react-date-picker',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
          dayjs: 'day',
        },
      },
    },
    minify: true,
  },
});
