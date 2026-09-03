/**
 * Construction build-ups: the layer specification for each element of the
 * envelope, at each available insulation thickness.
 *
 * Source: the WordPress technology page. The diagrams are Trident's own
 * artwork and are numbered 1..n; the legends were stored as flattened Kadence
 * fragments and have been reassembled here. Layer names arrived partly
 * untranslated and have been rendered into English throughout.
 *
 * Two known quirks in the source, corrected here:
 *  - the 100 mm external wall listed its last three layers as 7, 9, 8; the
 *    150/200 mm walls list the same three as 7, 8, 9, so that order is used.
 *  - the 100 mm pitched roof reused the 150 mm artwork. The drawing is generic
 *    across thicknesses, so the same file is referenced and the layer figures
 *    carry the actual dimensions.
 */

export interface Layer {
  n: number
  name: string
  /** Blank where the layer is a membrane or an optional customer choice. */
  spec: string
}

export interface BuildUp {
  /** Element of the envelope, e.g. "External walls". */
  element: string
  image: string
  layers: Layer[]
}

export interface ThicknessOption {
  /** Insulation thickness in millimetres, used as the tab label. */
  mm: number
  /** One line on what this specification suits. */
  summary: string
  buildUps: BuildUp[]
}

const IMG = '/images/library/'

const OPTIONAL = ''

/** Layers shared by every specification, so the wording stays consistent. */
const breather = { name: 'Juta breather membrane', spec: OPTIONAL }
const vapour = { name: 'Juta vapour control membrane', spec: OPTIONAL }
const finishSystem = { name: 'Internal finish mounting system', spec: 'Optional' }
const finish = { name: 'Internal finish', spec: 'Optional' }
const rodentMesh = { name: 'Rodent mesh', spec: 'Optional' }

/** Numbers a layer list in order, so the data cannot drift out of sequence. */
const seq = (layers: Omit<Layer, 'n'>[]): Layer[] =>
  layers.map((l, i) => ({ ...l, n: i + 1 }))

export const thicknesses: ThicknessOption[] = [
  {
    mm: 100,
    summary:
      'Our standard envelope, suited to garden rooms, studios and seasonal or holiday use.',
    buildUps: [
      {
        element: 'Pitched roof',
        image: `${IMG}2026-03-150-roofskat-new-2048x2048.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          { name: 'Counter-batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '95 mm' },
          { name: 'Basalt wool insulation', spec: '100 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Flat roof',
        image: `${IMG}2026-03-100-roofploska-new-2048x2048.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Geotextile', spec: '35 mm' },
          { name: 'OSB-3', spec: '18–22 mm' },
          breather,
          { name: 'Load-bearing frame', spec: '95 mm' },
          { name: 'Basalt wool insulation', spec: '100 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'External walls',
        image: `${IMG}2026-03-stena100new-1.webp`,
        layers: seq([
          { name: 'Façade', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '95 mm' },
          { name: 'Basalt wool insulation', spec: '100 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Internal walls',
        image: `${IMG}2026-03-stena-vnutri100new-2048x2048.webp`,
        layers: seq([
          finish,
          finishSystem,
          { name: 'OSB-3', spec: '10 mm' },
          { name: 'Load-bearing frame', spec: '95 mm' },
          { name: 'Basalt wool insulation', spec: '100 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Floor',
        image: `${IMG}2026-03-floor100new-2048x2048.webp`,
        layers: seq([
          finish,
          { name: 'OSB-3', spec: '18 mm' },
          vapour,
          { name: 'Basalt wool insulation', spec: '100 mm' },
          { name: 'Load-bearing frame', spec: '95 mm' },
          { name: 'OSB-3', spec: '10 mm' },
          rodentMesh,
        ]),
      },
    ],
  },
  {
    mm: 150,
    summary:
      'A step up in thermal performance, appropriate for year-round occupation in the UK climate.',
    buildUps: [
      {
        element: 'Pitched roof',
        image: `${IMG}2026-03-150-roofskat-new.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          { name: 'Counter-batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '145 mm' },
          { name: 'Basalt wool insulation', spec: '150 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Flat roof',
        image: `${IMG}2026-03-150-roofploska-new.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Geotextile', spec: '35 mm' },
          { name: 'OSB-3', spec: '18–22 mm' },
          breather,
          { name: 'Load-bearing frame', spec: '145 mm' },
          { name: 'Basalt wool insulation', spec: '150 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'External walls',
        image: `${IMG}2026-03-stena150new-1.webp`,
        layers: seq([
          { name: 'Façade', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '145 mm' },
          { name: 'Basalt wool insulation', spec: '150 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Floor',
        image: `${IMG}2026-03-floor150new-2048x2048.webp`,
        layers: seq([
          finish,
          { name: 'OSB-3', spec: '18–22 mm' },
          vapour,
          { name: 'Basalt wool insulation', spec: '150 mm' },
          { name: 'Load-bearing frame', spec: '145 mm' },
          { name: 'OSB-3', spec: '10 mm' },
          rodentMesh,
        ]),
      },
    ],
  },
  {
    mm: 200,
    summary:
      'A deeper frame and insulation layer for permanent homes where running costs matter most.',
    buildUps: [
      {
        element: 'Pitched roof',
        image: `${IMG}2026-03-kanek200-1.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          { name: 'Counter-batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Basalt wool insulation', spec: '200 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Flat roof',
        image: `${IMG}2026-03-200-roofploska-new-2048x2048.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Geotextile', spec: '35 mm' },
          { name: 'OSB-3', spec: '18–22 mm' },
          breather,
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Basalt wool insulation', spec: '200 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'External walls',
        image: `${IMG}2026-03-stena200new-1.webp`,
        layers: seq([
          { name: 'Façade', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Basalt wool insulation', spec: '200 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Floor',
        image: `${IMG}2026-03-floor200new-2048x2048.webp`,
        layers: seq([
          finish,
          { name: 'OSB-3', spec: '18–22 mm' },
          vapour,
          { name: 'Basalt wool insulation', spec: '200 mm' },
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'OSB-3', spec: '10 mm' },
          rodentMesh,
        ]),
      },
    ],
  },
  {
    mm: 250,
    summary:
      'Our warmest specification: 200 mm within the frame plus a 50 mm counter-insulated layer that breaks the thermal bridge through the studs.',
    buildUps: [
      {
        element: 'Pitched roof',
        image: `${IMG}2026-03-kanek250-1.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          { name: 'Counter-batten', spec: '35 mm' },
          breather,
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Basalt wool insulation', spec: '200 mm' },
          { name: 'Counter-insulation timber batten', spec: '45 mm' },
          { name: 'Counter-insulation basalt wool', spec: '50 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Flat roof',
        image: `${IMG}2026-03-250-roofploska-new-2048x2048.webp`,
        layers: seq([
          { name: 'Roof covering', spec: 'Optional' },
          { name: 'Geotextile', spec: '35 mm' },
          { name: 'OSB-3', spec: '18–22 mm' },
          breather,
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Basalt wool insulation', spec: '200 mm' },
          { name: 'Counter-insulation timber batten', spec: '45 mm' },
          { name: 'Counter-insulation basalt wool', spec: '50 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'External walls',
        image: `${IMG}2026-03-stena250new-1.webp`,
        layers: seq([
          { name: 'Façade', spec: 'Optional' },
          { name: 'Mounting batten', spec: '35 mm' },
          breather,
          { name: 'Counter-insulation timber batten', spec: '45 mm' },
          { name: 'Counter-insulation basalt wool', spec: '50 mm' },
          { name: 'OSB-3', spec: '12 mm' },
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Basalt wool insulation', spec: '200 mm' },
          vapour,
          finishSystem,
          finish,
        ]),
      },
      {
        element: 'Floor',
        image: `${IMG}2026-03-floor250new-2048x2048.webp`,
        layers: seq([
          finishSystem,
          { name: 'OSB-3', spec: '18–22 mm' },
          vapour,
          { name: 'Basalt wool insulation', spec: '200 mm' },
          { name: 'Load-bearing frame', spec: '195 mm' },
          { name: 'Counter-insulation timber batten', spec: '45 mm' },
          { name: 'Counter-insulation basalt wool', spec: '50 mm' },
          { name: 'OSB-3', spec: '10 mm' },
          rodentMesh,
        ]),
      },
    ],
  },
]

/** Photography of the factory, used across the technology page. */
export const factoryPhoto = '/images/library/2026-02-img-20240624-163513-scaled.webp'
export const systemPhoto = '/images/library/2026-02-urban2-interactive-lightmix.webp'
