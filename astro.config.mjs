import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL;
const base = process.env.BASE_PATH || '/';

if (site && !['http:', 'https:'].includes(new URL(site).protocol)) {
  throw new Error('SITE_URL must be an absolute HTTP or HTTPS URL.');
}

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), ...(site ? [sitemap()] : [])],
  vite: { plugins: [tailwindcss()] },
});
