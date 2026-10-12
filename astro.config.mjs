import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { lastmodFor } from './scripts/lastmod.mjs'

/**
 * Outbound links in the Markdown pages (privacy, cookies, terms) get
 * rel="nofollow noopener" and open in a new tab, as blog bodies do through
 * src/lib/external-links.ts.
 */
const externalLinks = () => (tree) => {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href ?? ''
      if (/^(https?:)?\/\//i.test(href) && !/^(https?:)?\/\/(www\.)?tridentmodular\.com(\/|$)/i.test(href)) {
        node.properties.rel = ['nofollow', 'noopener']
        node.properties.target = '_blank'
      }
    }
    node.children?.forEach(visit)
  }
  visit(tree)
}

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
  markdown: { rehypePlugins: [externalLinks] },
  build: { format: 'directory' },
})
