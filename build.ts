import { resolve } from 'node:path';
import { build } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import react from '@vitejs/plugin-react';
import { $ } from 'bun';

const ENTRYPOINTS = [
  {
    name: 'react-calendar.[format].js',
    path: ['index.ts'],
  },
  {
    name: 'plugins/date-picker.[format].js',
    path: ['plugins', 'date-picker.ts'],
  },
] satisfies Array<{ name: string; path: Array<string> }>;

await $`rm -rf ${import.meta.dir}/dist`;

for (const entrypoint of ENTRYPOINTS) {
  await build({
    plugins: [react()],
    build: {
      emptyOutDir: false,
      lib: {
        entry: resolve(import.meta.dir, 'src', ...entrypoint.path),
        name: '@zuruuh/react-calendar',
      },
      rollupOptions: {
        external: [...Object.keys(packageJson.peerDependencies)],
        output: {
          globals: {
            react: 'React',
            dayjs: 'day',
          },
          entryFileNames: () => entrypoint.name,
        },
      },
      minify: true,
    },
  });
}

await $`tsc --project tsconfig.build.json`
