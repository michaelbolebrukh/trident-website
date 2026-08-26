/**
 * BOPAS and certification content.
 *
 * Curated from the WordPress page rather than rendered from its markup, the
 * same treatment the technology page needed: the source is Kadence blocks that
 * flatten into fragments, and its only image (a photograph of the certificate)
 * lives on tridentmodular.com, which no longer serves images to us.
 *
 * The original closed with a list of supplier brands that did not survive
 * extraction. Rather than invent names, the materials section states what is
 * actually specified in the build-ups, which is verifiable — see build-ups.ts.
 */

export const intro =
  'BOPAS accreditation is what makes a modular home mortgageable. It is the scheme lenders, valuers and warranty providers look to for independent evidence that an offsite-built house will still be performing in sixty years.'

export interface Card {
  title: string
  body: string
}

/** The three questions the original page set out to answer. */
export const explainers: Card[] = [
  {
    title: 'What BOPAS is',
    body: 'The Buildoffsite Property Assurance Scheme accredits the quality and durability of offsite-constructed property. It is run with the Royal Institution of Chartered Surveyors and backed by Lloyd’s Register, and it assesses the manufacturer and the system, not one finished house.',
  },
  {
    title: 'How it validates our homes',
    body: 'Accreditation is granted on assessment and held through continuous evaluation, covering design, the production process and the factory’s quality management. It is a standard to keep meeting rather than a certificate to hang on a wall.',
  },
  {
    title: 'Why it matters to you',
    body: 'Lenders are cautious about non-traditional construction. BOPAS accreditation is recognised by the major banks, so a Trident home can be mortgaged, valued and resold on the same terms as a brick-built one.',
  },
]

export const credentials = [
  { label: 'BOPAS', detail: 'Accredited system, continuously evaluated' },
  { label: '60 years', detail: 'Durability assessment' },
  { label: 'ISO 9001:2015', detail: 'Quality managed factory' },
  { label: 'Class A1', detail: 'Non-combustible insulation' },
]

/**
 * What the accreditation actually rests on. Every figure here also appears in
 * the build-up schedules on the technology page.
 */
export const materials: Card[] = [
  {
    title: 'C24 structural timber',
    body: 'Calibrated, planed and kiln-dried softwood at 12–15% moisture content, so the frame behaves predictably under load and does not move after assembly.',
  },
  {
    title: 'Basalt wool insulation',
    body: 'Non-combustible to Class A1, from 100 mm up to 200 mm within the frame plus a 50 mm counter-insulated layer that breaks the thermal bridge through the studs.',
  },
  {
    title: 'Juta membranes',
    body: 'A breather membrane outside the insulation and a vapour control membrane inside it, so the build-up manages moisture in both directions across the life of the building.',
  },
  {
    title: 'OSB-3 sheathing',
    body: 'Load-bearing board rated for humid conditions, acting as the stiffening diaphragm that gives each panel its racking strength.',
  },
]
