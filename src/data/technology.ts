/**
 * Technology page content.
 *
 * Curated from the WordPress page rather than rendered from its markup. The
 * source is Kadence blocks that flatten into hundreds of fragments, so the
 * prose was lifted out and the page rebuilt in the site's own design.
 *
 * Not carried over: the construction build-up diagrams (roof, walls and floor
 * layer specifications). Those are tables in the original and survive
 * extraction only as loose numbers, so they need supplying as artwork.
 */

export const intro =
  'Modular house technology is a modern engineering solution that combines a classic timber frame with a panel construction approach, letting us build high-quality homes quickly and consistently. Every stage is carried out to ISO 9001:2015 standards.'

export interface Principle {
  title: string
  body: string
}

/** The engineering system, shown as cards. */
export const principles: Principle[] = [
  {
    title: 'Structural framework',
    body: 'An American-style timber frame combined with Finnish wood processing: calibrated, planed, kiln-dried softwood of strength class C24.',
  },
  {
    title: 'Framework system',
    body: 'Load-bearing timber of strength class C24 with controlled moisture content of 12–15%, giving structural stability and predictable performance under load.',
  },
  {
    title: 'Temperature and humidity',
    body: 'The envelope is insulated with non-combustible Class A1 basalt wool. The layers are designed to manage moisture and heat, holding energy efficiency across the building’s service life.',
  },
  {
    title: 'Spatial stiffness',
    body: 'Rigidity comes from panel cladding and engineered connection points acting as stiffening diaphragms, resisting wind and horizontal loads.',
  },
  {
    title: 'Factory quality',
    body: 'Panels and modules are made in the factory to the design dimensions and assembly specification, which minimises error and cuts time on site.',
  },
  {
    title: 'Whole-system design',
    body: 'Every component forms part of one engineering system, designed around energy efficiency, moisture resistance and spatial rigidity for the whole life cycle.',
  },
]

export interface Stage {
  n: string
  title: string
  body: string
}

/** How a Trident building is actually made, in order. */
export const stages: Stage[] = [
  {
    n: '01',
    title: 'Manufacture',
    body: 'Posts, beams, floors, panels and sections are made at the production site. Each panel is pre-assembled with façade and interior finishes, including insulation, OSB sheathing, waterproofing, vapour barrier and external cladding.',
  },
  {
    n: '02',
    title: 'Quality control',
    body: 'Continuous checks at every stage of production and assembly. Our specialists verify that each process meets the standard, which is what makes the structures reliable and durable.',
  },
  {
    n: '03',
    title: 'Materials',
    body: 'Material quality decides how long a house lasts. We use only high-quality, environmentally sound materials meeting the highest quality and safety standards.',
  },
  {
    n: '04',
    title: 'Installation',
    body: 'The house is assembled on a prepared foundation using Trident’s own method for connecting wall panels and sections, giving a strong connection and a tight fit between elements.',
  },
]

export const accreditations = [
  { label: 'ISO 9001:2015', detail: 'Quality managed factory' },
  { label: 'BOPAS', detail: 'Accredited system' },
  { label: 'Class A1', detail: 'Non-combustible insulation' },
  { label: 'C24', detail: 'Structural timber grade' },
]
