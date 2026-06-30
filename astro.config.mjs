// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://keshav-rana.github.io',
  integrations: [react(), tailwind()],
  devToolbar: { enabled: false },
  vite: {
    ssr: {
      noExternal: ['three'],
    },
  },
});
