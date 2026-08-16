/**
 * Named image slots for the marketing pages, drawn from Trident's own model
 * photography rather than stock libraries.
 *
 * Selection note: these were chosen by which model the photograph belongs to,
 * not by inspecting each frame — the source images sit behind the old site's
 * bot protection. Review them on staging and swap any that read oddly; every
 * slot is a one-line change here and nothing else needs touching.
 */
import { homeBySlug, houseImage } from './homes'

/** Nth gallery image for a model, falling back to its thumbnail. */
function pick(slug: string, index = 0): string {
  const home = homeBySlug(slug)
  if (!home) return ''
  const path = home.gallery[index] ?? home.gallery[0] ?? home.thumb
  return path ? houseImage(path) : ''
}

export const media = {
  // Flagship exteriors — the largest and most photographed models.
  heroExterior: pick('estate', 0),
  residenceExterior: pick('the-residence', 0),
  chaletExterior: pick('chalet', 0),
  loftExterior: pick('loft', 0),
  gothicExterior: pick('gothic', 2),
  aFrameExterior: pick('a-frame', 1),

  // Wider site and landscape shots.
  siteAerial: pick('lake', 1),
  siteSetting: pick('aqua', 1),
  forestSetting: pick('forest-house', 2),

  // Garden rooms.
  gardenRoom: pick('premium-model', 0),
  gardenRoomAlt: pick('base-model', 1),
  gardenStudio: pick('garden-studio', 0),

  // Interiors.
  interiorLiving: pick('chalet', 4),
  interiorKitchen: pick('riva', 3),
  interiorBedroom: pick('loft', 5),
  interiorDetail: pick('premium-model', 6),

  // Commercial — Trident's own café buildings.
  commercial: pick('modwood-cafe', 0),
  commercialAlt: pick('garden-cafe', 1),

  // Mid-range family homes.
  familyHome: pick('family-house', 0),
  bungalow: pick('country', 0),
  mediterranean: pick('mediterranean-double-house', 0),
  matchPoint: pick('match-point', 1),
  urban: pick('urban', 0),
  riva: pick('riva', 0),
} as const

export type MediaSlot = keyof typeof media
