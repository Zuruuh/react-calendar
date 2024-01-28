import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: '@zuruuh/react-date-picker',
  description: 'A fully customizable date picker component for React',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/simple-example' },
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Simple example', link: '/getting-started/simple-example' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Zuruuh/react-date-picker' },
    ],

    search: {
      provider: 'local',
    },
  },
});
