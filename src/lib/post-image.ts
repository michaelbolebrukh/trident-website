/**
 * Resolve a blog post's featured image to a local file.
 *
 * posts.json stores the URL the WordPress export recorded, which points at
 * tridentmodular.com/wp-content/uploads/ — a path this site does not serve.
 * Rendering it raw would paint a broken image on every post, so a post only
 * shows an image when we actually hold the file.
 *
 * The lookup strips the WordPress size suffix (-1024x576) so that holding the
 * original satisfies a reference to any of its generated sizes.
 */
import imageMap from '../data/image-map.json'

const map = imageMap as Record<string, string>

export function postImage(url: string | null | undefined): string | undefined {
  if (!url) return undefined
  const rel = decodeURIComponent(url.split('wp-content/uploads/')[1] ?? '')
  if (!rel) return undefined
  const base = rel.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1')
  return map[rel] ?? map[base] ?? undefined
}
