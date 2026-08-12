/**
 * Product range. PLACEHOLDER PRICING — these figures came from the Figma Make
 * export and do not match Trident's real price list (e.g. Garden Base is
 * listed here at £11,200 kit against an actual £6,200). Replace before launch.
 */
import { slugify } from '../lib/routes'

const IMGS = {
  garden: 'https://images.unsplash.com/photo-1697538022262-7eb736179973?w=700&h=500&fit=crop&auto=format',
  timber: 'https://images.unsplash.com/photo-1605018075968-b014b8d2e487?w=700&h=500&fit=crop&auto=format',
  frame: 'https://images.unsplash.com/photo-1696846911635-83b97e53fb65?w=700&h=500&fit=crop&auto=format',
  exterior: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=700&h=500&fit=crop&auto=format',
  aerial: 'https://images.unsplash.com/photo-1505060872009-ed2866c37da6?w=700&h=500&fit=crop&auto=format',
  hero: 'https://images.unsplash.com/photo-1766603636700-e9d80473f40f?w=700&h=500&fit=crop&auto=format',
}

const rawHomes = [
  { id: 1,  name: 'Garden Premium',     category: 'Garden Rooms', sizeRange: '20–35 m²',   desc: 'Versatile garden room with full insulation and glazed elevation.',       tags: ['3 sizes', 'Office', 'Studio', 'Annexe'],          kitPrice: '£16,800', shellPrice: '£22,500', turnkeyPrice: '£34,000', foundation: '£1,400', minArea: 20, maxArea: 35, beds: 0, img: IMGS.garden,   tag: 'Popular' },
  { id: 2,  name: 'Garden Base',        category: 'Garden Rooms', sizeRange: '15–25 m²',   desc: 'Entry-level garden room. Compact footprint, full insulation.',           tags: ['4 sizes', 'Office', 'Studio', 'Storage'],         kitPrice: '£11,200', shellPrice: '£15,900', turnkeyPrice: '£24,500', foundation: '£1,200', minArea: 15, maxArea: 25, beds: 0, img: IMGS.timber,   tag: '' },
  { id: 3,  name: 'Studio Max',         category: 'Garden Rooms', sizeRange: '28–42 m²',   desc: 'Larger garden studio with sleeping area and en-suite option.',           tags: ['2 sizes', 'Guest space', 'Studio', 'Home gym'],   kitPrice: '£19,500', shellPrice: '£26,000', turnkeyPrice: '£40,000', foundation: '£1,600', minArea: 28, maxArea: 42, beds: 1, img: IMGS.frame,    tag: '' },
  { id: 4,  name: 'Garden Annexe',      category: 'Garden Rooms', sizeRange: '32–45 m²',   desc: 'Self-contained annexe with kitchen, bedroom and bathroom.',              tags: ['2 sizes', 'Annexe', 'Guest space', 'Rental'],     kitPrice: '£22,000', shellPrice: '£30,000', turnkeyPrice: '£46,000', foundation: '£1,800', minArea: 32, maxArea: 45, beds: 1, img: IMGS.exterior, tag: 'New' },
  { id: 5,  name: 'Match Point',        category: 'Bungalows',    sizeRange: '68–76 m²',   desc: 'Efficient single-storey home with open-plan living.',                    tags: ['2 beds', '1 bath', 'Single storey'],              kitPrice: '£52,000', shellPrice: '£68,000', turnkeyPrice: '£102,000', foundation: '£3,500', minArea: 68, maxArea: 76, beds: 2, img: IMGS.aerial,   tag: '' },
  { id: 6,  name: 'Square of Harmony',  category: 'Bungalows',    sizeRange: '84–96 m²',   desc: 'Spacious bungalow with well-proportioned rooms and garden aspect.',      tags: ['3 beds', '2 baths', 'Single storey'],             kitPrice: '£64,000', shellPrice: '£83,000', turnkeyPrice: '£124,000', foundation: '£4,000', minArea: 84, maxArea: 96, beds: 3, img: IMGS.timber,   tag: 'Popular' },
  { id: 7,  name: 'The Loch',           category: 'Bungalows',    sizeRange: '76–86 m²',   desc: 'Contemporary bungalow with full-height glazing to the rear.',            tags: ['2 beds', '2 baths', 'Single storey'],             kitPrice: '£58,000', shellPrice: '£76,000', turnkeyPrice: '£114,000', foundation: '£3,800', minArea: 76, maxArea: 86, beds: 2, img: IMGS.garden,   tag: '' },
  { id: 8,  name: 'Loft',               category: '1.5 Storey',   sizeRange: '112–128 m²', desc: 'Open-plan ground floor with galleried mezzanine bedrooms above.',        tags: ['3 beds', '2 baths', 'Mezzanine level'],           kitPrice: '£85,000', shellPrice: '£110,000', turnkeyPrice: '£165,000', foundation: '£5,500', minArea: 112, maxArea: 128, beds: 3, img: IMGS.hero,     tag: 'Popular' },
  { id: 9,  name: 'Gothic',             category: '1.5 Storey',   sizeRange: '128–145 m²', desc: 'Distinctive roofline with large glazed gable and generous living.',      tags: ['4 beds', '2 baths', 'Mezzanine level'],           kitPrice: '£98,000', shellPrice: '£125,000', turnkeyPrice: '£188,000', foundation: '£6,000', minArea: 128, maxArea: 145, beds: 4, img: IMGS.frame,    tag: '' },
  { id: 10, name: 'Nordic Ridge',       category: '1.5 Storey',   sizeRange: '118–136 m²', desc: 'Pitched roof with clean lines and timber cladding as standard.',         tags: ['3 beds', '2 baths', 'Mezzanine level'],           kitPrice: '£90,000', shellPrice: '£115,000', turnkeyPrice: '£175,000', foundation: '£5,800', minArea: 118, maxArea: 136, beds: 3, img: IMGS.exterior, tag: '' },
  { id: 11, name: 'Grand Vista',        category: '2 Storey',     sizeRange: '165–185 m²', desc: 'Two full floors with generous room sizes and large glazed sections.',    tags: ['4 beds', '3 baths', 'Two storey'],                kitPrice: '£128,000', shellPrice: '£162,000', turnkeyPrice: '£244,000', foundation: '£7,500', minArea: 165, maxArea: 185, beds: 4, img: IMGS.aerial,   tag: '' },
  { id: 12, name: 'Birchwood',          category: '2 Storey',     sizeRange: '182–205 m²', desc: 'Substantial family home with five bedrooms and separate utility.',       tags: ['5 beds', '3 baths', 'Two storey'],                kitPrice: '£140,000', shellPrice: '£178,000', turnkeyPrice: '£268,000', foundation: '£8,000', minArea: 182, maxArea: 205, beds: 5, img: IMGS.timber,   tag: 'New' },
  { id: 13, name: 'Horizon',            category: '2 Storey',     sizeRange: '172–195 m²', desc: 'Wide frontage and panoramic glazing for maximum light.',                 tags: ['4 beds', '3 baths', 'Two storey'],                kitPrice: '£132,000', shellPrice: '£168,000', turnkeyPrice: '£252,000', foundation: '£7,800', minArea: 172, maxArea: 195, beds: 4, img: IMGS.hero,     tag: '' },
]

export type Home = (typeof rawHomes)[number] & { slug: string }

export const allHomes: Home[] = rawHomes.map((h) => ({ ...h, slug: slugify(h.name) }))

export const homeBySlug = (slug: string) => allHomes.find((h) => h.slug === slug)
