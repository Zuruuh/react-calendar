import { resolve } from 'node:path';

/** @type {import('@ladle/react').UserConfig} */
export default {
  viteConfig: resolve(process.cwd(), '.ladle', 'vite.config.ts'),
  outDir: 'preview',
  defaultStory: 'basic--simple',
  stories: 'src/stories/**/*.stories.{js,jsx,ts,tsx,mdx}',
};
