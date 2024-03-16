import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: '@zuruuh/react-calendar',
  description: 'A fully customizable calendar component for React',
  cleanUrls: true,
  lastUpdated: true,

  sitemap: {
    hostname: 'https://calendar.zuruh.dev',
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#61DAFB' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    [
      'meta',
      { name: 'og:image', content: 'https://calendar.zuruh.dev/og.png' },
    ],
    ['meta', { name: 'og:site_name', content: "Zuruuh's React Calendar" }],
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
          { text: 'Calendar', link: '/reference/calendar' },
          { text: 'Weeks', link: '/reference/weeks' },
          { text: 'Week', link: '/reference/week' },
          { text: 'Day', link: '/reference/day' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Zuruuh/react-calendar' },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@zuruuh/react-calendar',
      },
    ],

    search: {
      provider: 'local',
    },
  },
});
