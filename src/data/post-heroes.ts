/**
 * A lead image for each blog post, chosen from the site's own photo library
 * so the picture matches the subject. posts.json still carries the WordPress
 * featured-image URL, but those files were never migrated (see
 * src/lib/post-image.ts), so every post would otherwise run without one.
 *
 * Alt text describes what the photograph shows, not the article's title.
 */
import { media } from './media'
import { projects } from './projects'
import { factoryPhoto } from './build-ups'

export interface PostHero {
  src: string
  alt: string
}

const project = (slug: string) => projects.find((p) => p.slug === slug)!

export const postHeroes: Record<string, PostHero> = {
  'green-roofs-solar-panels-modular-home-options': { src: media.gardenRoom, alt: 'Garden Premium garden room with a flat roof, exterior' },
  'best-use-cases-of-modular-houses': { src: media.familyHome, alt: 'Family House single-storey modular home, exterior' },
  '2026-trends-in-modular-housing': { src: media.urban, alt: 'Urban two-storey modular home, front elevation' },
  'why-modular-frame-house-strong-stable': { src: media.chaletExterior, alt: 'Chalet timber-frame modular home, exterior' },
  'case-study-update-garden-house-with-fireplace': { src: project('chiswick').cover, alt: 'Completed garden room in Chiswick, London' },
  'modular-garden-house-integrated-fireplace': { src: project('wimbledon').cover, alt: 'Garden studio installed in Wimbledon, London' },
  'transporting-modular-houses': { src: media.siteAerial, alt: 'Lake modular home on its plot, aerial view' },
  'the-a-frame-cabin-trident-modular': { src: media.aFrameExterior, alt: 'A-Frame cabin, exterior' },
  'modular-sports-facilities': { src: media.matchPoint, alt: 'Match Point changing-room building for sports clubs' },
  'trident-modular-resorts': { src: media.forestSetting, alt: 'Forest House modular home in a woodland setting' },
  'modular-building-the-future-insight': { src: media.heroExterior, alt: 'Estate modular home, exterior' },
  '10-garden-house-maintenance-tips': { src: media.gardenRoomAlt, alt: 'Garden Base garden room, exterior' },
  'wooden-frame-construction-for-modular-housing': { src: factoryPhoto, alt: 'Timber wall panels being assembled on the factory floor' },
  '10-custom-modular-homes-options': { src: media.interiorKitchen, alt: 'Kitchen interior of the Riva modular home' },
  'energy-efficient-modular-homes': { src: media.gothicExterior, alt: 'Gothic two-storey modular home, exterior' },
  'modular-construction-for-healthcare-facilities': { src: media.commercial, alt: 'ModWood Cafe factory-built commercial building, exterior' },
  'modular-classrooms-are-transforming-uk': { src: media.commercialAlt, alt: 'Garden Cafe modular building, exterior' },
  'meeting-sustainability-goals': { src: media.forestSetting, alt: 'Forest House modular home among trees' },
  'modular-construction-trends-for-2025': { src: media.residenceExterior, alt: 'The Residence modular home, exterior' },
  'advantages-of-modular-construction': { src: media.loftExterior, alt: 'Loft bungalow with integrated garage, exterior' },
  'garden-office-ultimate-productivity-tool': { src: media.gardenStudio, alt: 'Garden Studio used as a home office, exterior' },
  'modular-housing-for-social-housing': { src: media.mediterranean, alt: 'Mediterranean Double House, exterior' },
  'exclusive-christmas-offer-transform-your-outdoor-space-with-our-garden-modular-house': { src: media.gardenRoomAlt, alt: 'Garden Base garden room, exterior' },
  'could-modular-housing-be-the-answer-to-the-housing-crisis': { src: media.bungalow, alt: 'Country single-storey modular home, exterior' },
}

export const heroFor = (slug: string): PostHero | undefined => postHeroes[slug]
