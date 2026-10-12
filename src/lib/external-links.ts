/**
 * Outbound links in HTML we did not write by hand (blog bodies from the
 * WordPress export) get rel="nofollow noopener" and open in a new tab. Links
 * to tridentmodular.com and relative links are left alone.
 */
const OWN_HOST = /^(https?:)?\/\/(www\.)?tridentmodular\.com(\/|$)/i

export function nofollowExternal(html: string): string {
  return html.replace(/<a\b([^>]*)>/gi, (tag, attrs: string) => {
    const href = /\bhref="([^"]*)"/i.exec(attrs)?.[1]
    if (!href || !/^(https?:)?\/\//i.test(href) || OWN_HOST.test(href)) return tag
    let out = attrs.replace(/\s+rel="[^"]*"/i, '').replace(/\s+target="[^"]*"/i, '')
    return `<a${out} rel="nofollow noopener" target="_blank">`
  })
}
