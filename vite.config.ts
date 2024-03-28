import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ insertTypesEntry: true, rollupTypes: true })],
  esbuild: {
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: true,
    jsxDev: false,
    jsx: 'transform',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: '@zuruuh/react-date-picker',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        compact: true,
        globals: {
          react: 'React',
          dayjs: 'day',
        },
      },
    },
    minify: true,
  },
});
