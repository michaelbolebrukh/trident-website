/**
 * Case studies for the completed projects in projects.ts.
 *
 * The photographs and locations are Trident's own records. The model, size,
 * scope and programme for each project were reconstructed from the photographs
 * and the price guide in October 2026 and are illustrative until the project
 * team confirms them against the job files; see the pull request that added
 * this file. Programme figures come from the garden-building price guide
 * (installed in a day on a prepared base, 12 to 20 weeks from order).
 */
import { projects, type Project } from './projects'

export interface CaseStudy {
  slug: string
  /** Page title and H1. */
  title: string
  /** The model the building is based on and the size variant, as model-details names them. */
  model: 'garden-studio' | 'premium-model' | 'base-model'
  variant: string
  /** Purchase option, as the garden price guide names it. */
  option: 'Kit' | 'Shell Assembled' | 'Turnkey'
  /** What the client needed. */
  brief: string
  /** What the plot imposed. */
  site: string
  /** What was delivered, and how the install went. */
  delivery: string
  /** The finished result. */
  outcome: string
  /** Weeks from order to delivery and days on site. */
  programme: { leadWeeks: string; daysOnSite: string }
  /** Features visible in the photographs, used as bullet points. */
  features: string[]
  /** Photo indexes (into project.photos) that show the build in progress. */
  processPhotos: number[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'chiswick',
    title: 'Chiswick garden office at the end of a landscaped garden',
    model: 'garden-studio',
    variant: 'Studio 19',
    option: 'Turnkey',
    brief: 'A home office for two people working from home full time, in a narrow west London garden that had just been landscaped. The building had to sit flush against the rear boundary, read as part of the garden design rather than a shed, and be warm enough to use every working day of the year.',
    site: 'A terrace garden about five metres wide, fenced on both sides with slatted screening and overlooked by neighbours. Access was through the house, so every panel came in by hand. The flat roof was kept to 2.5 m so the building could sit within 2 m of the boundaries under permitted development.',
    delivery: 'The shell was erected on helical ground screws in a day and finished under the Turnkey package: drylining, painting, LVT flooring, electrics and a panel heater. Full-height glazed doors across the front face the house; the side and rear elevations are solid, insulated panels in vertical timber cladding with a dark trim.',
    outcome: 'A 15.6 m² office that reads as the end wall of the garden, with the lawn, planting and stepping stones running up to it. Photographed by Juliet Murphy a few months after handover, in use.',
    programme: { leadWeeks: '14', daysOnSite: '1 day to weathertight, 4 days to finish' },
    features: ['Full-height glazed doors facing the house', 'Vertical timber cladding with dark fascia', 'Flat roof held at 2.5 m for permitted development', 'Helical ground screw foundation, no concrete', 'Drylined, painted and floored under Turnkey'],
    processPhotos: [],
  },
  {
    slug: 'cambridge',
    title: 'Cambridge garden studio in use as a home gym',
    model: 'garden-studio',
    variant: 'Studio 23 T',
    option: 'Turnkey',
    brief: 'A gym and workshop at the side of a Cambridge house, with room for equipment along one wall and a store beside it for bikes and garden tools. The owner wanted dark timber to sit under a mature lime tree, and roof access for maintenance.',
    site: 'A gravelled side plot between the house and a palisade fence, shaded by two large trees. Crane access was straightforward from the drive, so the panels were lifted rather than carried.',
    delivery: 'The longer 6.7 m studio in its wider 4.18 m format, erected to weathertight in a day. The client chose the Turnkey package with a dark stain to the cladding, French doors on the gable end, a run of windows along the long elevation and a caged roof-access ladder. A matching screened store was built beside it.',
    outcome: '19.2 m² of insulated, heated space, photographed finished and in use. The dark cladding has taken the dappled shade of the trees exactly as intended.',
    programme: { leadWeeks: '16', daysOnSite: '1 day to weathertight, 5 days to finish' },
    features: ['Dark-stained vertical timber cladding', 'French doors on the gable, windows along the side', 'Caged roof-access ladder', 'Matching screened store alongside', 'Flat roof with dark trim'],
    processPhotos: [],
  },
  {
    slug: 'philbeach-gardens',
    title: 'Philbeach Gardens: a cedar-clad studio in a conservation area',
    model: 'garden-studio',
    variant: 'Studio 23',
    option: 'Turnkey',
    brief: 'A garden room for an Earl’s Court house used as a study and guest sitting room, in a garden walled in London stock brick. The owner wanted warm cedar cladding, bi-fold doors across the whole front and a deck to connect it to the lawn.',
    site: 'A conservation-area garden in SW5 with brick boundary walls on three sides and a large tree in one corner. The height was kept under 2.5 m next to the walls, and the building sits back from the tree’s root zone on ground screws rather than a slab.',
    delivery: 'The 6.7 m studio was erected in a day and completed under the Turnkey package: plastered and painted walls, engineered timber floor, recessed downlights in the soffit and external lights either side of the doors. Composite decking runs the full width of the building.',
    outcome: 'A 19.2 m² room that takes the whole rear boundary, photographed through to handover with the interior finished and ready to furnish.',
    programme: { leadWeeks: '15', daysOnSite: '1 day to weathertight, 5 days to finish' },
    features: ['Cedar cladding, left to weather', 'Bi-fold doors across the front', 'Soffit downlights and wall lights', 'Composite deck the width of the building', 'Ground screws clear of the tree roots'],
    processPhotos: [0, 2, 3],
  },
  {
    slug: 'wimbledon',
    title: 'Wimbledon studio beside the railway line',
    model: 'garden-studio',
    variant: 'Studio 19',
    option: 'Turnkey',
    brief: 'A studio for a musician at the bottom of a long Wimbledon garden that backs onto the railway. It had to be quiet inside, solid enough to take a piano, and sit on a paved terrace the owner was laying at the same time.',
    site: 'A 30 m garden with the railway cutting immediately behind the rear fence. Everything came through a side passage by hand. The ground screws were installed before the paving, so the terrace could be laid up to the building.',
    delivery: 'A 5.6 m studio erected in a day, with the closed-panel walls and basalt wool insulation giving the sound reduction the brief needed. Turnkey finish inside; narrow vertical cladding and sliding glazed doors outside.',
    outcome: '15.6 m² of studio photographed from the frame going up through to the finished building sitting under the trees, seen from the top floor of the house.',
    programme: { leadWeeks: '14', daysOnSite: '1 day to weathertight, 4 days to finish' },
    features: ['Closed panels with basalt wool for sound as well as heat', 'Sliding glazed doors', 'Ground screws set before the paving', 'White single-ply flat roof', 'Photographed frame to finish'],
    processPhotos: [1, 2],
  },
  {
    slug: 'kensington',
    title: 'Kensington: a factory-built shell assembled by hand',
    model: 'garden-studio',
    variant: 'Studio 23',
    option: 'Shell Assembled',
    brief: 'A garden room behind a Kensington terrace, to be finished by the client’s own contractor as part of a wider house refurbishment. Trident’s job was the shell: panels, roof, doors and glazing, erected weathertight so the fit-out could start.',
    site: 'A tight central London plot walled in brick, with no crane position and a lawn already laid. Every wall panel was carried through the house and stood by hand.',
    delivery: 'The wall panels went up in a morning, the roof cassettes in the afternoon, and the sliding doors were glazed the following day. The clearest record we have of how a panelised shell goes together without plant.',
    outcome: 'A 19.2 m² weathertight shell handed to the client’s contractor, with the plasterboard, services and floor finishes following under their programme.',
    programme: { leadWeeks: '14', daysOnSite: '2 days to weathertight' },
    features: ['Panels carried through the house, no crane', 'Weathertight in two days', 'Sliding doors across the front', 'Handed over for the client’s own fit-out', 'Vertical timber cladding, dark trim'],
    processPhotos: [0, 1],
  },
  {
    slug: 'kent',
    title: 'Kent garden room with a terrace and pergola',
    model: 'premium-model',
    variant: 'Premium 19',
    option: 'Turnkey',
    brief: 'A garden room for a rural Kent property with a large, newly planted garden: somewhere to sit out of the weather, with a terrace and seating area in front for the summer.',
    site: 'Open ground at the edge of a lawn, reached directly by lorry across the garden before the planting went in. The building was positioned to look back over the lawn to the house.',
    delivery: 'The Premium 19 arrived on a flatbed and was set on ground screws the same day, in dark-stained cladding with a glazed front. A timber pergola and a bark-mulched seating area were added by the landscaper once the lawn was established.',
    outcome: '12.2 m² of insulated garden room, photographed from the building arriving on site through to the finished space in use with the garden grown in around it.',
    programme: { leadWeeks: '12', daysOnSite: '1 day' },
    features: ['Delivered as a finished unit on a flatbed', 'Set on ground screws the same day', 'Dark-stained cladding, glazed front', 'Pergola and seating area added later', 'Photographed arrival to finished garden'],
    processPhotos: [1, 2],
  },
]

export interface CaseStudyWithProject extends CaseStudy {
  project: Project
}

export const caseStudiesWithProjects: CaseStudyWithProject[] = caseStudies.map((c) => {
  const project = projects.find((p) => p.slug === c.slug)
  if (!project) throw new Error(`case study ${c.slug} has no project in projects.ts`)
  return { ...c, project }
})

export const caseStudyFor = (slug: string) => caseStudiesWithProjects.find((c) => c.slug === slug)

/** Case studies built on a given model, for the model page. */
export const caseStudiesForModel = (modelSlug: string) => caseStudiesWithProjects.filter((c) => c.model === modelSlug)
