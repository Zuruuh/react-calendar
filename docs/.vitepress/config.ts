import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: '@zuruuh/react-date-picker',
  description: 'A fully customizable date picker component for React',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://date-picker.zuruh.dev',
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#61DAFB' }],
    ['meta', { name: 'og:site_name', content: 'React Date Picker' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/installation' },
      { text: 'API Reference', link: '/reference' },
    ],

    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Philosophy', link: '/philosophy' },
          { text: 'Why this library ?', link: '/why-this-library' },
          { text: 'Examples', link: '/examples' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Index', link: '/reference' },
          { text: 'DatePicker', link: '/reference/date-picker' },
          { text: 'Calendar', link: '/reference/calendar' },
          { text: 'Week', link: '/reference/week' },
          { text: 'Day', link: '/reference/day' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Zuruuh/react-date-picker' },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@zuruuh/react-date-picker',
      },
    ],

    search: {
      provider: 'local',
    },
  },
});
