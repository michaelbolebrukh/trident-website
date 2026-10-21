/**
 * A unique FAQ set for every landing and category page. No question appears
 * on more than one page, and none repeats the master list in faq.ts, which
 * belongs to /faq/. Figures are read from the data files at build time.
 *
 * Wording that goes beyond the data is marked for Oleg's review in the pull
 * request rather than here.
 */
import { allHomes } from './homes'
import { HOUSE_OPTIONS, PROGRAMME, PAYMENT_SCHEDULE, STANDARD_EXCLUSIONS } from './pricing'
import { thicknesses } from './build-ups'
import { materials } from './accreditation'
import { projects } from './projects'
import { detailFor } from './model-details'
import { specFor } from './catalogue-specs'
import { floorAreaMin, floorAreaText } from '../lib/area'
import { routes } from '../lib/routes'

export interface PageFaq {
  q: string
  a: string
}

const programme = (title: string) => PROGRAMME.find(([t]) => t === title)?.[1] ?? ''
const list = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items[0] ?? '')
const inCategory = (name: string) => allHomes.filter((h) => h.categories.includes(name))
const areas = allHomes.map((h) => floorAreaMin(h))
const [shell, assembly, turnkey] = HOUSE_OPTIONS
const basalt = materials.find((m) => m.title === 'Basalt wool insulation')!
const membranes = materials.find((m) => m.title === 'Juta membranes')!
const london = projects.filter((p) => /London/.test(p.location))
const twoStorey = inCategory('2 Storey Houses')
const withGarage = allHomes.filter((h) => /garage/i.test(h.desc)).map((h) => h.name)
const base6 = detailFor('base-model')?.variants.slice().sort((a, b) => a.area - b.area)[0]

export const pageFaqs: Record<string, PageFaq[]> = {
  [routes.modularHomes]: [
    { q: 'What does Trident mean by a modular home?', a: 'A house manufactured as closed timber-frame panels in the factory, with insulation, membranes, sheathing and cladding already fitted, then assembled on your foundation. It is a permanent dwelling built to the same Building Regulations as a site-built house, not a mobile or temporary structure.' },
    { q: 'Which sizes does the modular home range cover?', a: `From ${Math.min(...areas)} m² to ${Math.max(...areas)} m² of internal floor area across ${allHomes.length} models in six categories: garden rooms and tiny homes, bungalows, 1.5 storey and two-storey houses, and the log-style models.` },
    { q: 'How do the three purchase options differ?', a: `${shell.label} brings the factory-made shell to your site for your own team to erect. ${assembly.label} adds unloading, crane and erection to weathertight by our crew. ${turnkey.label} adds the helical ground screw foundation, internal finishes, one bathroom, basic services and handover.` },
    { q: 'Where can I see what a finished Trident building looks like?', a: `The case studies and the projects page show completed installations in ${list(projects.map((p) => p.location.split(',')[0]))}, and every model page publishes floor plans, the catalogue room schedule and photographs, so the range can be compared before you enquire.` },
  ],
  [routes.kitHomes]: [
    { q: 'What exactly arrives with a Trident kit home?', a: shell.desc },
    { q: 'Do I need my own builder to assemble a kit home?', a: `Yes. Under ${shell.label} the unloading and assembly are yours, so you need a crane and a crew used to timber-frame panels. If you would rather we did it, ${assembly.label} covers unloading, erection to weathertight and commissioning of the cladding, roof and windows.` },
    { q: 'How are the panels transported and unloaded?', a: 'The panels travel flat on articulated lorries and are lifted off and into position by crane. Delivery to Greater London is included in the kit price; further afield is quoted with the kit once we know the postcode and access.' },
    { q: 'Are floor cassettes and the foundation part of the kit?', a: `No. Floor cassettes are excluded from both Shell options and the foundation is yours to build to our drawings. Both are included in ${turnkey.label}.` },
  ],
  [routes.prices]: [
    { q: 'Why are the prices shown as "from"?', a: 'Each figure is the published price for the model at its standard specification and, where a model comes in several sizes, its smallest. Cladding choices, upgrades, the foundation and site access move the final number, so a firm quotation follows a review of your plot.' },
    { q: 'How are payments staged on a modular home?', a: `${PAYMENT_SCHEDULE.map(([share, when]) => `${share} ${when}`).join(', ')}.` },
    { q: 'What costs sit outside every price on this page?', a: `${list(STANDARD_EXCLUSIONS.map((g) => g.title.toLowerCase()))}. The full list is above, and planning fees, surveys and groundworks are the usual items a budget forgets.` },
    { q: 'How long is it from contract to moving in?', a: `Typically ${programme('Contract to handover')}: ${programme('Design and approval')} for design and approval, ${programme('Factory production')} in the factory, ${programme('Freight and customs')} for freight, ${programme('Erection and weathertight')} on site to weathertight and ${programme('Internal fit-out (turnkey)')} for a Turnkey base fit-out.` },
  ],
  [routes.forSale]: [
    { q: 'Are the modular homes for sale in stock or made to order?', a: `Made to order. Each house is manufactured to its published design after the technical documentation is approved, which takes ${programme('Factory production')} in the factory.` },
    { q: 'Can I buy a modular home before I own a plot?', a: 'The building needs a plot with planning permission and a foundation before it can be delivered, so the land comes first. We can look at a plot you are considering for access, crane position and services before you commit to it.' },
    { q: 'What deposit secures an order?', a: `${PAYMENT_SCHEDULE[0][0]} ${PAYMENT_SCHEDULE[0][1]}, with the balance staged through approval, dispatch and handover.` },
    { q: 'Is delivery included in the sale price?', a: `Delivery to Greater London is included in every ${shell.label} price. Delivery elsewhere in the UK is quoted with the home once we have the postcode.` },
  ],
  [routes.factoryBuilt]: [
    { q: 'How is a factory-built home quality-checked?', a: 'The factory runs a quality management system certified to ISO 9001:2015, panels are made to the design dimensions and assembly specification under cover, and the BOPAS accreditation is held through continuous evaluation of the system and the production process.' },
    { q: 'Does a factory-built house travel as whole rooms?', a: 'No. Trident builds closed panels rather than finished room modules, so the components travel flat on standard lorries and are craned into place on site; there is no oversize load and no module seams inside the finished house.' },
    { q: 'How long does the factory take to make a house?', a: `${programme('Factory production')} for production, plus ${programme('Freight and customs')} for freight and customs before the panels reach your site.` },
    { q: 'Why does factory manufacture matter to a mortgage lender?', a: 'Lenders class offsite construction as non-standard and look for independent assurance. BOPAS accredits the factory and the building system together, with a sixty-year durability assessment, which is what valuers and the major UK lenders recognise.' },
  ],
  [routes.selfBuild]: [
    { q: 'Which tasks does a self-builder take on with Shell delivered?', a: 'The foundation, unloading, erecting the panels and roof, floor cassettes, every service connection, and all internal finishes. The factory supplies the weathertight shell components with cladding, windows and external doors fitted.' },
    { q: 'What drawings come with the shell?', a: 'The panel layout and assembly specification the factory built to, the build-up schedules for walls, roof and floor, and the material specifications. Your designer uses the same documents for the Building Regulations application.' },
    { q: 'Can I switch from a kit to assembly by Trident after ordering?', a: `Yes. The shell is identical in all three options, so ${assembly.label} can be added as a separate quotation before the panels are dispatched.` },
    { q: 'Do I pay VAT on a self-build modular home?', a: 'Prices are quoted excluding VAT. For a new dwelling you will live in, HMRC’s DIY Housebuilders Scheme refunds the VAT paid on building materials after completion; garden rooms and professional fees are outside it. Confirm your position with an accountant before relying on the refund.' },
  ],
  [routes.london]: [
    { q: 'Is delivery to London included in the price?', a: `Yes. Delivery to Greater London is included in every ${shell.label} price, and the same applies to the shell within ${assembly.label} and ${turnkey.label}.` },
    { q: 'Where in London has Trident installed buildings?', a: `${list(london.map((p) => p.location))}. Photographs of each are on the projects page and in the case studies.` },
    { q: 'How do you get a crane into a London garden?', a: 'Access, crane position and any parking suspension are assessed at quotation. Because the buildings arrive as panels rather than whole modules, the crane needed is smaller than for volumetric construction, and in many gardens the lift is made from the street.' },
    { q: 'Do London boroughs allow a garden room without planning permission?', a: 'The permitted development limits apply in London as elsewhere, but conservation areas and Article 4 directions are common in the inner boroughs and can remove them. Check your borough’s planning pages first; the planning permission guide sets out the limits.' },
  ],
  [routes.modern]: [
    { q: 'What makes the design of a Trident home modern?', a: 'Clean elevations with large fixed and opening glazing to the garden side, flat or shallow-pitched roofs on several models, and a choice of dark-stained timber cladding or white render. The structure behind the elevation is the same closed-panel frame throughout.' },
    { q: 'Can room sizes and openings be moved on a standard model?', a: 'Yes, before the panels are manufactured. Internal walls, window and door positions and room sizes are adjusted to your brief at design stage, and the floor plans are reissued for your approval.' },
    { q: 'Which models have two full storeys?', a: `${list(twoStorey.map((h) => h.name))}, from ${Math.min(...twoStorey.map((h) => floorAreaMin(h)))} m² to ${Math.max(...twoStorey.map((h) => floorAreaMin(h)))} m².` },
    { q: 'Can a flat roof carry a green roof?', a: 'Yes. A green roof is an optional upgrade on the flat-roof models, and solar PV with battery storage can be specified on flat or pitched roofs. Both are priced per project.' },
  ],
  [routes.companies]: [
    { q: 'How can I check a modular building company’s accreditation?', a: 'Ask for the BOPAS certificate and check it against the scheme’s register, ask for the ISO 9001 certificate and its expiry, and ask to see the build-up schedules for walls, roof and floor. Trident’s are published on the BOPAS and technology pages.' },
    { q: 'Is Trident a manufacturer or a reseller?', a: 'Trident Modular Housing Ltd designs the models, manufactures the panels in its own factory and installs them, so one company is responsible from drawing to handover.' },
    { q: 'Where is Trident Modular Housing registered?', a: 'The registered office is Tallis House, 2 Tallis Street, London EC4Y 0AB. Company details are on the privacy policy page.' },
    { q: 'What certificates are handed over with a building?', a: `Under ${turnkey.label} the services are installed, tested and certified before handover, and the BOPAS and ISO 9001:2015 certificates are supplied for your lender or warranty provider. An extended warranty is available as a priced upgrade.` },
  ],
  [routes.commercial]: [
    { q: 'Which commercial buildings are in the standard range?', a: `${list(allHomes.filter((h) => /commercial|changing room|caf[eé]/i.test(h.desc) || /caf[eé]|match point/i.test(h.name)).map((h) => h.name))}. Each can be adapted to the site and the operator’s fit-out.` },
    { q: 'Can a commercial building be delivered fitted out?', a: 'Yes. The shell can be delivered, erected to weathertight, or completed with internal finishes and services. Sports and leisure fit-outs are site-adapted and quoted per project.' },
    { q: 'How quickly can a cafe or changing-room building be on site?', a: `A firm proposal follows within five working days of an enquiry, and the programme from contract to handover is typically ${programme('Contract to handover')}, with ${programme('Erection and weathertight')} of that on site to weathertight.` },
    { q: 'Do commercial buildings need planning permission?', a: 'Yes. Permitted development for outbuildings applies to houses, not to commercial sites, so a cafe, changing room or office building is a planning application judged on its own merits. We supply the drawings and the technical description for it.' },
  ],
  [routes.eco]: [
    { q: 'Which insulation thickness should I choose?', a: `${thicknesses.map((t) => `${t.mm} mm: ${t.summary.replace(/\.$/, '')}`).join('. ')}.` },
    { q: 'Is the insulation fire-safe?', a: basalt.body },
    { q: 'Does Turnkey base include a heat pump?', a: `Yes. ${turnkey.desc}` },
    { q: 'How is moisture managed inside the walls?', a: membranes.body },
  ],
  [routes.planning]: [
    { q: 'How tall can a garden room be without planning permission?', a: 'Eaves no higher than 2.5 m, and an overall height of 4 m with a dual-pitched roof or 3 m with any other roof. Within 2 m of a boundary the whole building must be no taller than 2.5 m.' },
    { q: 'Can I sleep in a garden room built under permitted development?', a: 'No. Permitted development covers buildings incidental to the house, such as an office, studio or gym. Sleeping accommodation, a self-contained annexe or a holiday let needs planning permission.' },
    { q: 'What is a lawful development certificate and do I need one?', a: 'A certificate from the council confirming that the building was lawful without permission. It is optional, but it removes doubt when you sell the house, and it is the simplest answer to a neighbour’s query.' },
    { q: 'How long does a planning application take?', a: 'The council has eight weeks to decide a householder or minor application once it is validated, longer if it is called to committee. Pre-application advice before you submit can shorten the process.' },
  ],
  [routes.buildingRegs]: [
    { q: 'Is a garden room under 15 m² exempt from Building Regulations?', a: 'Yes, if nobody sleeps in it. From 15 m² to 30 m² it stays exempt when it has no sleeping accommodation and is either at least 1 m from every boundary or built substantially of non-combustible materials. Electrical work must still meet Part P.' },
    { q: 'What are the Part L limiting U-values for a new house?', a: 'External walls 0.26, floors 0.18, roofs 0.16 and windows or doors 1.6 W/m²K, from Approved Document L, Volume 1, 2021 edition, Table 4.1. These are limits an element may not exceed; the dwelling as a whole must also meet its energy target.' },
    { q: 'Who submits the Building Regulations application?', a: 'You or your designer, to the local authority or an approved inspector. Trident supplies the build-up schedules, material specifications and drawings the application needs; the SAP calculation and foundation design for your plot are done by your designer or ours.' },
    { q: 'Does the electrical work come with a certificate?', a: `Yes. Under ${turnkey.label} the basic electrics are installed, tested and certified by a registered electrician, which satisfies Part P and is what building control asks to see.` },
  ],

  [routes.warranty]: [
    { q: 'When does the 10-year structural guarantee start?', a: 'On the date of practical completion, the day we hand the building over, and it runs for ten years from there. The 12-month finishes and workmanship warranty starts on the same day.' },
    { q: 'Is the structural guarantee the same as a new-home warranty?', a: 'No. The structural guarantee is Trident’s own promise to repair or replace defective panels and connections. Lenders usually also want a 10-year insurance-backed new-home warranty on a dwelling, which is a separate policy from a warranty provider; the BOPAS accreditation is what makes the system acceptable to them.' },
    { q: 'What voids the guarantee?', a: 'Alterations to the structure or envelope by anyone other than Trident or a Trident-certified specialist, use outside our written instructions, missing or unrecorded maintenance, and defects not reported promptly. Fair wear, shrinkage, misuse and storm or flood damage were never covered.' },
    { q: 'How is a defect reported and how fast do you respond?', a: 'In writing, with photographs, to contact@tridentmodular.com. We acknowledge every report within two working days and agree the next steps within ten working days. Agreed snagging items from the handover inspection are put right at no cost.' },
  ],

  // Category pages, keyed by their path
  '/houses-type/garden-rooms/': [
    { q: 'What base does a garden room sit on?', a: 'Helical ground screws, installed in a day without excavation or concrete, so the building can be removed later and the garden reinstated. A level slab is an alternative where one already exists.' },
    { q: 'Will a garden office be warm enough in January?', a: `${basalt.body} The garden-room Turnkey package includes a panel heater, and the same wall build-up is used on the permanent homes.` },
    { q: 'What is in the garden room Turnkey package?', a: detailFor('base-model')?.packages[2].desc ?? 'Shell plus internal finishes, electrics and heating.' },
    { q: 'How quickly is a garden room installed?', a: 'A kit or assembled shell goes up in a day on a prepared base, with the internal finish taking a few days more under the Turnkey package. Lead time from order is confirmed against the production schedule at quotation.' },
  ],
  '/houses-type/bungalows/': [
    { q: 'Can a bungalow be used as an annexe for a parent?', a: 'Yes. A single-storey home beside the main house is the usual form of a garden annexe. It needs planning permission as residential accommodation, normally with a condition tying it to the main house, and the Turnkey base option delivers it ready to occupy.' },
    { q: 'Which single-storey models have a garage?', a: withGarage.length ? `${list(withGarage)}, with the garage within the footprint rather than as a separate building.` : 'None of the current models include a garage.' },
    { q: 'What is the largest single-storey model?', a: `${inCategory('Bungalows').sort((a, b) => floorAreaMin(b) - floorAreaMin(a))[0].name}, at ${floorAreaText(inCategory('Bungalows').sort((a, b) => floorAreaMin(b) - floorAreaMin(a))[0])} of internal floor area.` },
    { q: 'Why are Riva and Aqua listed with the bungalows?', a: 'They share their shells with Part and Lake but are adapted for water, sitting on pontoons instead of ground screws. The accommodation is the same single-storey layout.' },
  ],
  '/houses-type/1-5-storey-houses/': [
    { q: 'What is a 1.5 storey house?', a: 'A house with bedrooms in the roof space above a full ground floor. The pitched roof gives usable rooms with sloping ceilings at the edges, so the footprint stays close to a bungalow’s while the accommodation grows.' },
    { q: 'Is the roof covering included in the shell price?', a: 'Yes. For both models the combined timber and metal cladding and the metal standing seam roof are in the Shell delivered price, so the shell is weathertight with nothing further to buy.' },
    { q: 'How many bedrooms do the 1.5 storey models have?', a: `${list(inCategory('1.5 Storey Houses').map((h) => `${h.name} has ${specFor(h.slug)?.bedrooms ?? h.bedrooms}`))}, counted from the catalogue room schedules.` },
    { q: 'Does the Mediterranean Single House suit a rental unit?', a: 'It is designed for a compact plot with the functionality of a full house: kitchen-living room, separate living room, bathroom and a bedroom upstairs. That makes it a common choice for a let or a garden annexe, subject to planning permission.' },
  ],
  '/houses-type/2-storey-houses/': [
    { q: 'How is a two-storey shell erected?', a: 'The ground-floor panels are craned onto the foundation, the first-floor cassettes and panels follow, then the roof. A two-storey shell reaches weathertight in the same 10 to 12 days on site as a bungalow because the panels arrive complete.' },
    { q: 'Is the staircase included?', a: `In ${turnkey.label}, yes: the scope lists the staircase where applicable, along with internal doors, linings and one bathroom. In the two Shell options the stair is part of the internal fit-out, which stays with you.` },
    { q: 'Which two-storey models have four or more bedrooms?', a: (() => { const big = twoStorey.filter((h) => (specFor(h.slug)?.bedrooms ?? h.bedrooms ?? 0) >= 4); return big.length ? `${list(big.map((h) => h.name))}.` : 'None of the current two-storey models; the largest have three bedrooms.' })() },
    { q: 'Does a two-storey house need a different foundation?', a: `${turnkey.label} includes a helical ground screw foundation designed for the building’s loads. With the Shell options the foundation is yours, built to our drawings, and the design allows for the heavier two-storey frame.` },
  ],
  '/houses-type/log-houses/': [
    { q: 'Is a Trident log house built from solid logs?', a: 'No. The log character is a horizontal timber cladding with a log profile fixed to the closed-panel frame, with basalt wool insulation inside the wall. It does not shrink or settle the way a solid-log wall does.' },
    { q: 'Does log cladding need maintenance?', a: 'Like any external timber it needs re-coating periodically, depending on exposure and the finish chosen. The frame and insulation behind it are protected by the breather membrane and are unaffected.' },
    { q: 'Can Match Point be used for something other than changing rooms?', a: 'Yes. It is a site-adapted commercial model, so the communal area and the two changing rooms can be re-planned as a clubhouse, kiosk or office at design stage.' },
    { q: 'Why is Loft quoted on request?', a: 'Loft has no standard published price yet. It is adapted to the site, so we return a firm number within five working days of an enquiry across the three purchase options.' },
  ],
  '/houses-type/tiny-pod-homes/': [
    { q: 'What is the smallest pod Trident makes?', a: base6 ? `${base6.name}, at ${base6.area} m² (${base6.dimensions} mm). The sizes step up from there within each garden model.` : 'The garden room range starts at a few square metres.' },
    { q: 'Can a tiny home be rented out?', a: 'A pod used as holiday or rental accommodation is a dwelling for planning purposes, so it needs planning permission. Once that is in place, the same building is suited to rental income, guest accommodation or a compact permanent home.' },
    { q: 'Do the tiny homes have a bathroom?', a: (() => { const withBath = inCategory('Tiny Homes & Pod Homes').filter((h) => (specFor(h.slug)?.bathrooms ?? h.bathrooms ?? 0) > 0).map((h) => h.name); return withBath.length ? `${list(withBath)} include a bathroom in the catalogue room schedule; the garden pods are single rooms, with a bathroom added as a bespoke option.` : 'The garden pods are single rooms; a bathroom is a bespoke addition.' })() },
    { q: 'How is a pod home delivered?', a: 'As a factory kit or an assembled shell on a lorry, lifted into position by crane and fixed to helical ground screws. Because it is panelised it can be dismantled and relocated later.' },
  ],
}

export const pageFaqsFor = (path: string): PageFaq[] => pageFaqs[path] ?? []
