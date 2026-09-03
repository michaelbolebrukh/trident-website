/**
 * Completed Trident projects, from the photography Trident supplied.
 *
 * This replaces a gallery of stock imagery with invented captions — it named
 * counties the company had not built in and models that were not in the shot.
 * Everything here is a real installation, and the only claim made about each
 * is where it is, which the source folders record.
 *
 * The Chiswick and Cambridge sets are by Juliet Murphy Photography; the rest are Trident's own
 * site records, which is why they run from bare frames through to finished
 * gardens. That mix is worth keeping: it shows the process, not just the
 * result.
 */

export interface Project {
  slug: string
  name: string
  location: string
  blurb: string
  /** Files under public/images/projects/. */
  photos: string[]
  /**
   * The card image. Not simply the first photo: these sets are shot in
   * sequence, so several open on an interior or a half-finished corner, which
   * makes a poor introduction to the project.
   */
  cover: string
}

const photos = (prefix: string, n: number): string[] =>
  Array.from({ length: n }, (_, i) => `/images/projects/${prefix}-${String(i + 1).padStart(2, '0')}.webp`)

export const projects: Project[] = [
  {
    slug: 'chiswick',
    name: 'Chiswick garden room',
    location: 'Chiswick, London W4',
    blurb:
      'A garden room set against slatted screening at the end of a landscaped west London garden, with full-height glazing across the front and a flat roof kept low to respect the boundary.',
    photos: photos('chiswick', 16),
    cover: '/images/projects/chiswick-01.webp',
  },
  {
    slug: 'cambridge',
    name: 'Cambridge garden studio',
    location: 'Cambridge',
    blurb:
      'A dark-timber studio set under a mature tree, with a roof-access ladder and a matching screened store beside it — photographed finished and in use as a home gym.',
    photos: photos('cambridge', 5),
    cover: '/images/projects/cambridge-04.webp',
  },
  {
    slug: 'philbeach-gardens',
    name: 'Philbeach Gardens',
    location: 'Earl’s Court, London SW5',
    blurb:
      'A cedar-clad build against the brick wall of a conservation-area garden, photographed through to handover — exterior, cladding detail and an interior taken to a finished, ready-to-furnish state.',
    photos: photos('philbeach', 7),
    cover: '/images/projects/philbeach-02.webp',
  },
  {
    slug: 'wimbledon',
    name: 'Wimbledon garden studio',
    location: 'Wimbledon, London SW19',
    blurb:
      'A studio at the far end of a long garden, shown from the frame going up through to the finished building sitting under mature trees.',
    photos: photos('wimbledon', 5),
    cover: '/images/projects/wimbledon-01.webp',
  },
  {
    slug: 'kensington',
    name: 'Kensington installation',
    location: 'Kensington, London W8',
    blurb:
      'A tight central London site, recorded from the wall panels going up by hand through to the finished building — the clearest illustration we have of how quickly a factory-built shell goes together.',
    photos: photos('kensington', 3),
    cover: '/images/projects/kensington-03.webp',
  },
  {
    slug: 'kent',
    name: 'Kent garden room',
    location: 'Kent',
    blurb:
      'A garden room with a pergola and terrace, opening onto a lawn. Photographed from the module arriving on site through to the finished space in use.',
    photos: photos('kent', 6),
    cover: '/images/projects/kent-01.webp',
  },
]

/** Every photo, flattened, with the project it belongs to. */
export const allPhotos = projects.flatMap((p) =>
  p.photos.map((src) => ({ src, project: p.name, location: p.location, slug: p.slug })),
)
