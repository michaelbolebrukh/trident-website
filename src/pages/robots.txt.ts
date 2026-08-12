import type { APIRoute } from 'astro'

/**
 * Staging builds set PUBLIC_NOINDEX=1, which blocks crawlers outright so the
 * temporary Hostinger domain never competes with tridentmodular.com.
 */
export const GET: APIRoute = ({ site }) => {
  const blocked = import.meta.env.PUBLIC_NOINDEX === '1'

  const body = blocked
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
