import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

import vitesseDark from './src/styles/vitesse-dark.json'

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: vitesseDark,
    },
  },
  integrations: [tailwind()],
})
