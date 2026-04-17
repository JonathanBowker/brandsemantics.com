// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://advancedanalytica.co.uk',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap()]
});
