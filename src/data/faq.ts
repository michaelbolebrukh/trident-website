/**
 * The questions the FAQ page answers. Rendered by FaqPage.tsx and emitted as
 * FAQPage structured data by src/pages/faq.astro, so the two never drift.
 */
export interface Faq {
  q: string
  a: string
  cat: string
}

export const faqCategories = ['All', 'Choosing a Home', 'Pricing & Quotes', 'Design & Customisation', 'Planning & Permissions', 'Installation', 'Base & Turnkey', 'Technical', 'Delivery', 'Sustainability']

export const faqs: Faq[] = [
  { q: 'What is the difference between a modular home and a frame-built home?', a: 'Modular homes are manufactured in sections in a factory and assembled on site. However, frame-built homes have a structural timber frame constructed or assembled on site. Both offer excellent insulation and can be customised.', cat: 'Choosing a Home' },
  { q: 'Can I adapt a standard design to suit my site?', a: 'Yes. Most of our standard models can be modified in size, layout, external finish and internal specification. We review your site and plot constraints before recommending the most suitable approach.', cat: 'Choosing a Home' },
  { q: 'What is the smallest building you supply?', a: 'Our smallest garden rooms start from 4.4 m². We also supply larger annexes and full residential homes from 54 m² upwards.', cat: 'Choosing a Home' },
  { q: 'How do I get a price?', a: 'You can request a quotation through our contact page or by telephone. Catalogue prices shown are starting figures as actual costs depend on your specification, site conditions and the chosen completion option.', cat: 'Pricing & Quotes' },
  { q: 'Do the prices shown on the website include VAT?', a: 'No, the prices shown do not include VAT. VAT can vary depending on the nature of the project and site, and we will clarify this at the quotation stage.', cat: 'Pricing & Quotes' },
  { q: 'Is finance available?', a: 'We do not arrange finance directly, but can recommend specialist providers for self-build and garden room finance.', cat: 'Pricing & Quotes' },
  { q: 'Can I choose different external cladding or colours?', a: 'Yes. Our buildings are available with a range of external finishes including dark-stained timber cladding, through-coloured render, fibre cement panels and larch. We can discuss specific requirements at design stage.', cat: 'Design & Customisation' },
  { q: 'Can I add a green roof or solar panels?', a: 'Both are available as optional upgrades. Green roofs can be specified on flat-roof sections. Solar photovoltaic panels can be integrated into the roof structure. Both are available for most standard models.', cat: 'Design & Customisation' },
  { q: 'Do I need planning permission for a garden room?', a: 'Many garden rooms fall within permitted development rights and do not require a planning application, depending on their size, position and use. We recommend checking with your local planning authority. We can also provide planning guidance as part of our service.', cat: 'Planning & Permissions' },
  { q: 'Do residential homes require full planning permission?', a: 'Yes. However, we can provide planning support and work with your architect or planning consultant if required.', cat: 'Planning & Permissions' },
  { q: 'How long does installation take?', a: 'Structural assembly for a modular home typically takes three to ten days depending on the model. Internal completion under a turnkey contract takes longer and depends on the specification agreed.', cat: 'Installation' },
  { q: 'Do I need to prepare a foundation before you deliver?', a: 'Yes. Foundations are required before delivery. For Base contracts, the client is responsible for groundworks. For Turnkey contracts, we can include foundation and groundworks within the scope. This is typically discussed at the quotation stage.', cat: 'Installation' },
  { q: 'What is the difference between Base and Turnkey?', a: 'Base means we supply and assemble the building to the agreed structural specification. Turnkey means we manage the entire process including groundworks, internal finishing, services and handover. Both options use the same manufactured building.', cat: 'Base & Turnkey' },
  { q: 'Can I add services to a Base contract separately?', a: 'Yes. We can provide individual services such as electrical installation, plumbing or internal joinery as separately priced additions to a Base contract. Speak to us at quotation stage.', cat: 'Base & Turnkey' },
  { q: 'What insulation values do your buildings achieve?', a: 'Our standard wall construction achieves a U-value of approximately 0.18 W/m²K. Roofs achieve approximately 0.12 W/m²K. Floors achieve approximately 0.13 W/m²K. Detailed specifications are available on request.', cat: 'Technical' },
  { q: 'Are your buildings suitable for year-round use?', a: 'Yes. All Trident buildings are designed for year-round use with full insulation, heating and ventilation. Garden rooms are equally suitable as permanent workspaces or annexes.', cat: 'Technical' },
  { q: 'How far do you deliver?', a: 'We deliver nationwide. Delivery logistics are assessed at the quotation stage alongside confirmation of crane requirements, vehicle access and any restrictions specific to your site.', cat: 'Delivery' },
  { q: 'How long does delivery take after I place an order?', a: 'Lead times vary depending on current production schedule and specification. Typical lead times from order to delivery are 12–20 weeks. Production schedules are confirmed at the quotation stage.', cat: 'Delivery' },
  { q: 'Are your buildings energy efficient?', a: 'Yes. All buildings are designed to meet or exceed current Part L requirements. We offer a range of sustainable upgrades including air-source heat pumps, solar panels, green roofs, MVHR ventilation and underfloor heating.', cat: 'Sustainability' },
]
