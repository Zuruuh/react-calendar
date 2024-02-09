import { resolve } from 'node:path';
import { build } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import { $ } from 'bun';
import { rm, readdir } from 'node:fs/promises';

const ENTRYPOINTS = [
  {
    name: 'react-calendar.[format].js',
    path: ['index.ts'],
  },
  ...(await readdir('src/plugins'))
    .map((file) => file.replace('.ts', ''))
    .map((plugin) => ({
      name: `plugins/${plugin}.[format].js`,
      path: ['plugins', `${plugin}.ts`],
    })),
] satisfies Array<{ name: string; path: Array<string> }>;

await rm(`${import.meta.dir}/dist`, { force: true, recursive: true });

for (const entrypoint of ENTRYPOINTS) {
  await build({
    esbuild: {
      minifyWhitespace: true,
      minifySyntax: true,
      minifyIdentifiers: true,
      jsx: 'transform',
    },
    build: {
      emptyOutDir: false,
      lib: {
        entry: resolve(import.meta.dir, 'src', ...entrypoint.path),
        name: '@zuruuh/react-calendar',
      },
      rollupOptions: {
        external: [
          ...Object.keys(packageJson.peerDependencies),
          // TODO fix this so plugins can export/import from each other
          // ...ENTRYPOINTS.filter((entry) => entry.name !== entrypoint.name).map(
          // (entry) => resolve(import.meta.dir, 'src', ...entry.path),
          // ),
        ],
        output: {
          compact: true,
          globals: {
            react: 'React',
          },
          entryFileNames: () => entrypoint.name,
        },
      },
    },
  });
}

await $`tsc --project tsconfig.build.jsonc`;
