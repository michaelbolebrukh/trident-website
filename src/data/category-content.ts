/**
 * Long-form copy for the three category pages that were thin.
 *
 * Every figure is read from the model data at build time by
 * CategorySections.astro; the prose here only says what the data supports.
 * FAQ items are the category's own, in page-faqs.ts.
 */
export interface CategoryContent {
  /** H2 of the intro block, carrying the page's search phrase naturally. */
  introTitle: string
  intro: string[]
  choosingTitle: string
  choosing: { title: string; body: string }[]
  faqTitle: string
}

export const categoryContent: Record<string, CategoryContent> = {
  'tiny-pod-homes': {
    introTitle: 'Tiny house UK living: the smallest habitable Trident models',
    intro: [
      'Tiny Homes & Pod Homes is a secondary tag rather than a class of its own: it marks the smallest habitable models in the range, whichever class they file under. The tag currently covers a factory-built garden café, three single-storey homes of around 54 to 55 m², and a sports changing-room module. Each is built on the same closed-panel timber frame as the largest house we make.',
      'A micro home UK plot owners can actually live in is a real house rather than a cabin: Square of Harmony offers two separate bedrooms and a spacious terrace, Part balances compact design with a terrace for outdoor seating and dining, and Riva is the floating version of Part, adapted for water with pontoons in place of ground screws. The cards above show internal area, bedrooms and the published from prices for each of the three purchase options where one exists.',
      'Buyers searching for a pod home UK-wide use these models as an annexe on an existing plot, a rental unit, or a compact permanent home. Because the panel kit is small, the three purchase options matter more than usual: Shell delivered leaves foundation and assembly to you, Shell + Assembly has our team erect the weathertight shell, and Turnkey base adds the ground screw foundation, floor panels, internal finishing, one standard bathroom, basic services and handover.',
    ],
    choosingTitle: 'Choosing a tiny home or pod home',
    choosing: [
      {
        title: 'Habitable or commercial',
        body: 'Part, Riva and Square of Harmony are homes with bedrooms and bathrooms. Garden Cafe and Match Point are commercial fit-outs: a café installed in a day, and a changing-room module for sports clubs. Match Point is site-adapted and quoted on request.',
      },
      {
        title: 'On land or on water',
        body: 'Riva shares its shell with Part but is adapted for water. The foundation differs, pontoons rather than screws, and is priced separately, so compare the two on the model pages before choosing.',
      },
      {
        title: 'Which purchase option',
        body: 'Published from prices exist for Part, Riva and Square of Harmony across Shell delivered, Shell + Assembly and Turnkey base. The full comparison, with price per square metre, is on the price guide.',
      },
      {
        title: 'Planning and foundations',
        body: 'Residential homes require full planning permission; we can provide planning support and work with your architect or planning consultant. Foundations are required before delivery, and delivery logistics and crane access are assessed at quotation.',
      },
    ],
    faqTitle: 'Common questions',
  },

  bungalows: {
    introTitle: 'Prefab bungalows UK: single-storey modular homes',
    intro: [
      'A Trident bungalow is a single storey modular home built on our closed-panel timber frame, manufactured in the factory and assembled on your foundation. The class runs from compact one-bedroom homes suited to a garden plot or a rental unit, through two-bedroom country houses, to large family homes with a garage. Two of the models, Riva and Aqua, share their shells with Part and Lake but are adapted for water, with pontoons in place of ground screws.',
      'Single-storey suits a lot of UK plots: no staircase, every room on one level, and a footprint that can sit beside an existing house as an annexe or stand alone as a permanent home. Prices are published for most models as from figures across three purchase options, Shell delivered, Shell + Assembly and Turnkey base, and a few larger or site-adapted models are quoted on request.',
    ],
    choosingTitle: 'Choosing a single storey modular home',
    choosing: [
      {
        title: 'Start with the floor area',
        body: 'The models are listed from the smallest internal area up. A one-bedroom home around 54 m² works as an annexe or a rental unit; two bedrooms from 46.2 m² suit a couple or a small family; the largest run past 200 m² with an integrated garage.',
      },
      {
        title: 'Count the bedrooms you need',
        body: 'Bedroom and bathroom counts on each card come from the catalogue room schedules. Several models share a bedroom count but differ in how the living space is arranged, so open the floor plans before deciding.',
      },
      {
        title: 'Decide how much you want to manage',
        body: 'Shell delivered leaves foundation, unloading and assembly to you. Shell + Assembly has our team erect the shell to weathertight. Turnkey base adds the helical ground screw foundation, internal finishing, one bathroom, basic services and handover. Kitchen, underfloor heating, MVHR and PV are priced separately.',
      },
      {
        title: 'Check what the plot can take',
        body: 'Residential homes require full planning permission, and we can provide planning support. Delivery, crane requirements and site access are assessed at quotation, and foundations are needed before delivery.',
      },
    ],
    faqTitle: 'Single-storey modular homes: common questions',
  },

  '2-storey-houses': {
    introTitle: '2 storey modular homes UK: two full floors, factory-built',
    intro: [
      'A two-storey Trident house gives you first-floor bedrooms and a full ground floor for living, on the same insulated panel system as the rest of the range. The class includes a two-bedroom timber family home, three-bedroom houses with terraces and a study, a four-bedroom residence, and the A-Frame cabin. Two of the models are quoted on request; the rest carry published from prices.',
      'Because the panels arrive pre-assembled with insulation, sheathing, membranes and cladding, a two-storey shell goes up in the same 10 to 12 days on site as a bungalow, then the internal fit-out follows under a Turnkey base contract.',
      'Every house in the class is sold three ways. Shell delivered brings the structural panel kit, factory-fitted cladding, windows and external doors to site for your own team to erect. Shell + Assembly adds our crew, crane and plant, and hands over a weathertight shell. Turnkey base adds the helical ground screw foundation, floor panels, internal linings, one standard bathroom, staircase, basic electrics, plumbing and an air-source heat pump, then testing and handover. The A-Frame is priced on its own ladder in the 2026 price guide, with a foundation quoted separately from £17,500, and a kit without floor cassettes for building on a concrete slab.',
    ],
    choosingTitle: 'Choosing a 2 storey modular home',
    choosing: [
      {
        title: 'Three bedroom modular house, or four?',
        body: 'The cards show bedrooms and bathrooms from the catalogue room schedules. For a 3 bedroom modular house in the UK, choose between Urban at 127.6 m² and Gothic at 157.5 m²; the four-bedroom Residence is 145 m². Compare the floor plans, since the models place bedrooms and terraces differently.',
      },
      {
        title: 'Staircase and layout',
        body: 'Turnkey base includes the staircase where applicable, plasterboard, LVT flooring, one standard bathroom, internal doors, basic electrics, plumbing and an air-source heat pump. A full kitchen, a premium bathroom and premium floor finishes are quoted as upgrades.',
      },
      {
        title: 'Published or on request',
        body: 'Some two-storey designs need adapting to the closed-panel system before a firm number can be given; those are marked on request and come back as a firm proposal within 5 working days of enquiry.',
      },
      {
        title: 'Planning and site',
        body: 'Residential homes require full planning permission. We can work with your architect or planning consultant, and we assess delivery and crane access at quotation.',
      },
    ],
    faqTitle: 'Two-storey modular houses: common questions',
  },

  'log-houses': {
    introTitle: 'Log houses UK: the log-cabin look on an insulated panel system',
    intro: [
      'A Trident log house gives you the look of a log cabin without the drawbacks of solid-log construction. The walls are the same closed-panel timber frame used across the range, with C24 structural timber, non-combustible basalt wool insulation and OSB-3 sheathing, finished externally in horizontal timber cladding with a log profile. Solid logs shrink, settle and need regular re-sealing; a panel with the insulation inside the frame holds its shape and its thermal performance.',
      'Two models carry the log character. Loft is a substantial single-storey home with two bedrooms, a home office, a large terrace and an integrated garage, designed for country living. Match Point is a sports and leisure building with two changing rooms, two bathrooms and a communal area, so a club can add facilities beside a pitch or court without a conventional build. Both are quoted on request as site-adapted models.',
    ],
    choosingTitle: 'Choosing a log-style modular home',
    choosing: [
      {
        title: 'Decide what the building is for',
        body: 'Loft is a permanent home; Match Point is a commercial building for sports and leisure use. The comparison table below lists floor area, bedrooms, bathrooms and storeys for each, taken from the catalogue room schedules.',
      },
      {
        title: 'Log character is a cladding choice',
        body: 'The log profile is the external finish, not the structure. The same model can be specified with the other standard finishes, and the price guide applies regardless of cladding. Open the technology page to see the wall build-up layer by layer.',
      },
      {
        title: 'Site-adapted pricing',
        body: 'Neither model has a published from-price yet: both are adapted to the plot, so we return a firm proposal within five working days of an enquiry, across the same three purchase options as the rest of the range.',
      },
      {
        title: 'Planning and foundations',
        body: 'A permanent home needs full planning permission, and a commercial building is assessed on its own merits. Foundations are needed before delivery; the Turnkey base option includes helical ground screws. We can provide planning support.',
      },
    ],
    faqTitle: 'Log houses: common questions',
  },

  '1-5-storey-houses': {
    introTitle: '1.5 storey modular homes UK: a half-storey of bedrooms over the living space',
    intro: [
      'A 1.5 storey house puts the bedrooms in the roof. The ground floor carries the kitchen, living space and a bathroom, and a staircase leads to rooms under the pitched roof, so the plot stays as compact as a bungalow while the accommodation grows. Both Trident models in this class are built on the closed-panel timber frame described on the technology page, with C24 structural timber and non-combustible basalt wool insulation, and arrive with combined timber and metal cladding and a metal standing seam roof included in the shell price.',
      'Mediterranean Single House is the compact option: one bedroom, one bathroom, a kitchen-living room and a separate living room on a plot that would suit a garden annexe or a rental unit. Mediterranean Double House scales the same idea up to three bedrooms, two bathrooms and a sauna, for a family home or a holiday let. Both are published with from-prices across the three purchase options, Shell delivered, Shell + Assembly and Turnkey base.',
    ],
    choosingTitle: 'Choosing a 1.5 storey modular home',
    choosing: [
      {
        title: 'Count the rooms, not just the area',
        body: 'The room schedules in the comparison table come from the catalogue. A 1.5 storey layout gives more rooms for its footprint than a bungalow of the same area, because the roof space works as a floor.',
      },
      {
        title: 'Check the staircase and headroom in the plans',
        body: 'Rooms under a pitched roof have sloping ceilings at the edges. Open the floor plans on each model page to see where the full-height space falls and where the stair lands.',
      },
      {
        title: 'Weathertight is included',
        body: 'For both models the cladding and the standing seam roof are in the Shell delivered price, so nothing further is needed to make the shell weathertight. Compare the three options on the model page or in the full price guide.',
      },
      {
        title: 'Planning and foundations',
        body: 'A residential home needs full planning permission; we can provide planning support. Foundations are required before delivery, and the Turnkey base option includes helical ground screws and the internal fit-out.',
      },
    ],
    faqTitle: '1.5 storey homes: common questions',
  },

  'garden-rooms': {
    introTitle: 'Insulated garden rooms UK: office, studio or guest space',
    intro: [
      'A Trident garden building is a factory-built, insulated timber-frame structure delivered as a kit or erected on site, on a ground screw foundation that is quoted separately. The class covers the compact Garden Base, the deeper Garden Premium, the Garden Studio with an ensuite shower room, and a factory-built garden café. The Base, Premium and Studio are BOPAS certified and built in an ISO 9001 quality managed factory.',
      'They are designed for year-round use as a garden office pod, UK-wide, or as an art studio, a gym or a guest space. The walls and roof use non-combustible basalt wool insulation and Juta breather and vapour control membranes, with C24 structural timber and OSB-3 sheathing, and the price guides state U-values of 0.28 W/m²K for walls and 0.23 W/m²K for roofs.',
      'Sizes are set by the panel module. Garden Base runs from 2300 × 2590 mm to 5600 × 2590 mm external; Garden Premium from 2300 × 3360 mm to 5600 × 3360 mm; Garden Studio from 5600 × 3370 mm to 6700 × 4180 mm. Each is priced per size on a three-step ladder in the price guides, from the factory kit through the assembled weathertight shell to a finished, move-in-ready building, and the Studio turnkey adds an ensuite shower room, water heater, Forbo flooring and full electrics.',
    ],
    choosingTitle: 'Choosing an insulated garden building',
    choosing: [
      {
        title: 'Footprint and depth',
        body: 'Garden Base is 2.59 m deep in four sizes from 4.4 to 12.2 m² internal. Garden Premium is 3.36 m deep, from 6.5 to 12.2 m², with room for two desks or a small gym. Garden Studio runs from 15.6 to 19.2 m² with a shower room, and a deeper T variant of each size.',
      },
      {
        title: 'Kit, Shell Assembled or Turnkey',
        body: 'Each garden building has its own three-step ladder in the price guides: the factory kit for you to assemble, the weathertight shell erected by us, and a finished building with drylining, painting, LVT flooring, electrics and a panel heater. The Studio adds an ensuite shower room, water heater and Forbo flooring.',
      },
      {
        title: 'Planning',
        body: 'Many garden rooms fall within permitted development rights, depending on size, position and use. Check with your local planning authority; we can also provide planning guidance as part of our service.',
      },
      {
        title: 'Foundation and services',
        body: 'A ground screw foundation is quoted separately after a site survey, from £990 for Garden Base and £1,320 for Garden Premium. Electrical installation and other services can be added to a Base contract as separately priced items.',
      },
    ],
    faqTitle: 'Common questions',
  },
}
