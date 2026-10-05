import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { lastmodFor } from './scripts/lastmod.mjs'

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
  integrations: [
    react(),
    sitemap({
      // <lastmod> from git (blog posts: their publication date), so crawlers
      // can tell changed pages from unchanged ones. See scripts/lastmod.mjs.
      serialize(item) {
        const d = lastmodFor(item.url)
        if (d) item.lastmod = d.toISOString()
        return item
      },
    }),
    afterPaintDirective,
  ],
  vite: { plugins: [tailwindcss()] },
  build: { format: 'directory' },
})
