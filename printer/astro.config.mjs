import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import AutoImport from 'astro-auto-import'
import vitesseDark from './src/styles/vitesse-dark.json'
import { astroAsides, asideAutoImport } from './src/integrations/astro-asides'

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: vitesseDark,
    },
  },
  integrations: [
    AutoImport({
      imports: [asideAutoImport],
    }),
    tailwind(),
    astroAsides(),
    mdx(),
  ],
})
