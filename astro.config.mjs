import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // ...otras configuraciones...
  output: 'server', // o 'hybrid' si usas SSR y SSG
  adapter: netlify(),
  integrations: [react(), tailwind()],
});