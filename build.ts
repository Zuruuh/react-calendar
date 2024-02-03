import { resolve } from 'node:path';
import { build } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import react from '@vitejs/plugin-react';
import { $ } from 'bun';
import { rm } from 'node:fs/promises';

const ENTRYPOINTS = [
  {
    name: 'react-calendar.[format].js',
    path: ['index.ts'],
  },
  ...[
    'date-picker',
    'controls',
    'keyboard-navigation',
    'week-overlap',
    'range',
  ].map((plugin) => ({
    name: `plugins/${plugin}.[format].js`,
    path: ['plugins', `${plugin}.ts`],
  })),
] satisfies Array<{ name: string; path: Array<string> }>;

await rm(`${import.meta.dir}/dist`, { force: true, recursive: true });

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

await $`tsc --project tsconfig.build.jsonc`;
