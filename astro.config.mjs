import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

/**
 * `client:afterpaint`: hydrate once the first frame is on screen. Used for
 * the page islands so the React bundle never delays the largest paint; see
 * src/lib/client-after-paint.ts.
 */
const afterPaintDirective = {
  name: 'client-after-paint',
  hooks: {
    'astro:config:setup': ({ addClientDirective }) => {
      addClientDirective({ name: 'afterpaint', entrypoint: './src/lib/client-after-paint.ts' })
    },
  },
}

// https://astro.build/config
export default defineConfig({
  site: 'https://tridentmodular.com',
  integrations: [react(), sitemap(), afterPaintDirective],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
})
