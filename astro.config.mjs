import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// --- Domain portability: change these two lines to move to a custom domain ---
// GitHub Pages project site:  site = 'https://adiadarsh1.github.io', base = '/salarylens-web'
// Custom domain later:        site = 'https://salarylens.in',        base = '/'
const SITE = 'https://adiadarsh1.github.io';
const BASE = '/salarylens-web';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [react(), tailwind(), sitemap()],
});
