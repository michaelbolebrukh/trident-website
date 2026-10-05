import type { APIRoute } from 'astro'

/**
 * Staging builds set PUBLIC_NOINDEX=1, which blocks crawlers outright so the
 * temporary Hostinger domain never competes with tridentmodular.com.
 *
 * The /feed/ rules keep Google off the RSS URLs WordPress used to serve for
 * every archive and post. They 301 to their pages (see .htaccess), but Search
 * Console was still spending crawl budget on them.
 */
export const GET: APIRoute = ({ site }) => {
  const blocked = import.meta.env.PUBLIC_NOINDEX === '1'

  const body = blocked
    ? 'User-agent: *\nDisallow: /\n'
    : [
        'User-agent: *',
        'Disallow: /feed/',
        'Disallow: /*/feed/',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', site)}`,
        '',
      ].join('\n')

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
