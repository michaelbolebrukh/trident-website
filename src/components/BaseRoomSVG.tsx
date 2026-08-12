export default function BaseRoomSVG() {
  // Joist front-x and back-x pairs (8 joists, evenly spaced)
  const joists: [number, number][] = [
    [136, 245], [212, 289], [288, 334], [364, 379],
    [440, 424], [516, 468], [592, 513], [668, 557],
  ]

  // Wood grain lines on ceiling (cross direction)
  const studs = [240, 280, 320, 360, 400, 440, 480, 520, 560]

  // Concrete expansion joints across floor
  // Floor: "60,460 740,460 600,290 200,290"
  // At y, x_left = 200 - 140*t, x_right = 600 + 140*t, t = (y-290)/170
  const plankLine = (y: number) => {
    const t = (y - 290) / 170
    return { x1: 200 - 140 * t, x2: 600 + 140 * t, y1: y, y2: y }
  }

  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A9EB5" />
          <stop offset="100%" stopColor="#A8C0D0" />
        </linearGradient>
        <linearGradient id="b-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A0A098" />
          <stop offset="100%" stopColor="#84807A" />
        </linearGradient>
        <linearGradient id="b-ceil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8B2A8" />
          <stop offset="100%" stopColor="#C8C2B8" />
        </linearGradient>
        <clipPath id="b-floor-clip">
          <polygon points="60,460 740,460 600,290 200,290" />
        </clipPath>
        <clipPath id="b-back-clip">
          <polygon points="200,80 600,80 600,290 200,290" />
        </clipPath>
        <clipPath id="b-ceil-clip">
          <polygon points="60,180 740,180 600,80 200,80" />
        </clipPath>
        <clipPath id="b-left-clip">
          <polygon points="60,180 200,80 200,290 60,460" />
        </clipPath>
        <clipPath id="b-right-clip">
          <polygon points="740,180 600,80 600,290 740,460" />
        </clipPath>
      </defs>

      {/* Ambient background */}
      <rect width="800" height="500" fill="#9AADB8" />

      {/* ─── FLOOR — raw concrete screed ─── */}
      <polygon points="60,460 740,460 600,290 200,290" fill="url(#b-floor)" />
      {/* Expansion joint grid */}
      {[310, 330, 350, 370, 390, 410, 430, 450].map((y) => {
        const l = plankLine(y)
        return (
          <line
            key={y}
            x1={l.x1} y1={y} x2={l.x2} y2={y}
            stroke="#787470" strokeWidth="0.8" opacity="0.5"
          />
        )
      })}
      {/* Longitudinal joints */}
      <line x1="200" y1="290" x2="300" y2="460" stroke="#747070" strokeWidth="0.8" opacity="0.5" />
      <line x1="400" y1="290" x2="400" y2="460" stroke="#747070" strokeWidth="0.8" opacity="0.5" />
      <line x1="600" y1="290" x2="500" y2="460" stroke="#747070" strokeWidth="0.8" opacity="0.5" />
      {/* Aggregate texture dots */}
      {[
        [260,330],[310,380],[380,350],[430,420],[490,360],
        [540,400],[590,370],[620,440],[220,420],[350,450],
        [470,450],[550,445],[290,440],[410,345],[340,310],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#70706A" opacity="0.35" />
      ))}

      {/* ─── BACK WALL — bare plasterboard ─── */}
      <polygon points="200,80 600,80 600,290 200,290" fill="#C2BEB6" />
      {/* Vertical stud joints */}
      {studs.map((x) => (
        <line key={x} x1={x} y1="80" x2={x} y2="290" stroke="#AAAAAA" strokeWidth="1" opacity="0.7" />
      ))}
      {/* Horizontal sheet joint */}
      <line x1="200" y1="188" x2="600" y2="188" stroke="#AAAAAA" strokeWidth="1.5" opacity="0.8" />
      {/* Drywall screws */}
      {studs.map((x) => (
        <g key={`sc${x}`}>
          <circle cx={x} cy={130} r="2.8" fill="#989490" stroke="#787470" strokeWidth="0.5" />
          <line x1={x - 2} y1={130} x2={x + 2} y2={130} stroke="#606060" strokeWidth="0.8" />
          <line x1={x} y1={128} x2={x} y2={132} stroke="#606060" strokeWidth="0.8" />
          <circle cx={x} cy={248} r="2.8" fill="#989490" stroke="#787470" strokeWidth="0.5" />
          <line x1={x - 2} y1={248} x2={x + 2} y2={248} stroke="#606060" strokeWidth="0.8" />
          <line x1={x} y1={246} x2={x} y2={250} stroke="#606060" strokeWidth="0.8" />
        </g>
      ))}

      {/* Window OPENING (rough, no frame) — sky visible */}
      <rect x="252" y="104" width="224" height="114" fill="url(#b-sky)" />
      {/* Raw reveal edges around opening */}
      <rect x="249" y="101" width="230" height="120" fill="none" stroke="#A8A4A0" strokeWidth="3" />
      {/* Reveal depth top */}
      <polygon points="249,101 479,101 479,104 249,104" fill="#B0ACA4" />
      {/* Reveal depth bottom */}
      <polygon points="249,218 479,218 479,221 249,221" fill="#B8B4AC" />

      {/* ─── CEILING — exposed timber structure ─── */}
      <polygon points="60,180 740,180 600,80 200,80" fill="url(#b-ceil)" />
      {/* Timber joists front-to-back */}
      {joists.map(([fx, bx], i) => (
        <g key={i}>
          <polygon
            points={`${fx - 10},180 ${fx + 10},180 ${bx + 6},80 ${bx - 6},80`}
            fill="#6B4E1E"
          />
          {/* Highlight edge */}
          <polygon
            points={`${fx - 10},180 ${fx - 7},177 ${bx - 6},80 ${bx - 9},83`}
            fill="#7A5E2A" opacity="0.5"
          />
          {/* Wood grain on joist face */}
          <line
            x1={fx - 4} y1={180} x2={bx - 2} y2={80}
            stroke="#7A5028" strokeWidth="0.5" opacity="0.5"
          />
        </g>
      ))}
      {/* Metal joist hangers at back wall */}
      {joists.map(([, bx], i) => (
        <rect key={i} x={bx - 7} y={74} width={14} height={10} rx="1" fill="#7A8898" opacity="0.9" />
      ))}
      {/* Plasterboard between joists on ceiling face */}
      {joists.slice(0, -1).map(([fx, bx], i) => {
        const nx = joists[i + 1][0]
        const nbx = joists[i + 1][1]
        return (
          <polygon
            key={i}
            points={`${fx + 10},180 ${nx - 10},180 ${nbx - 6},80 ${bx + 6},80`}
            fill="#CCCAB8" opacity="0.5"
          />
        )
      })}

      {/* ─── LEFT WALL — plasterboard ─── */}
      <polygon points="60,180 200,80 200,290 60,460" fill="#B0ACA4" />
      {/* Stud lines (perspective) */}
      {[0.25, 0.5, 0.75].map((t, i) => {
        const x1 = 60 + t * (200 - 60)
        const y1 = 180 + t * (80 - 180)
        const x2 = 60 + t * (200 - 60)
        const y2 = 460 + t * (290 - 460)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9A9690" strokeWidth="1" opacity="0.6" />
        )
      })}
      {/* Horizontal sheet joint */}
      <line x1="75" y1="348" x2="200" y2="188" stroke="#9A9690" strokeWidth="1" opacity="0.6" />
      {/* Shadow overlay */}
      <polygon points="60,180 200,80 200,290 60,460" fill="rgba(0,0,0,0.08)" />

      {/* ─── RIGHT WALL — plasterboard ─── */}
      <polygon points="740,180 600,80 600,290 740,460" fill="#BCBAAE" />
      <polygon points="740,180 600,80 600,290 740,460" fill="rgba(0,0,0,0.06)" />

      {/* ─── ELECTRICAL CONDUIT ─── */}
      {/* Horizontal metal conduit below window on back wall */}
      <line x1="205" y1="240" x2="595" y2="240" stroke="#C07818" strokeWidth="7" strokeLinecap="round" />
      <line x1="205" y1="240" x2="595" y2="240" stroke="#E09030" strokeWidth="5" strokeLinecap="round" />
      {/* Saddle clips */}
      {[240, 300, 360, 420, 480, 540].map((x) => (
        <g key={x}>
          <rect x={x - 5} y={233} width={10} height={14} rx="1" fill="#B06818" />
          <circle cx={x} cy={237} r="3" fill="#9A5A14" />
        </g>
      ))}
      {/* Conduit drop to spur positions */}
      <line x1="270" y1="240" x2="270" y2="268" stroke="#A06010" strokeWidth="5" strokeLinecap="round" />
      <line x1="490" y1="240" x2="490" y2="268" stroke="#A06010" strokeWidth="5" strokeLinecap="round" />
      {/* Dangling wire ends at spurs */}
      <line x1="268" y1="268" x2="264" y2="282" stroke="#E8C830" strokeWidth="2.5" />
      <line x1="272" y1="268" x2="276" y2="282" stroke="#444444" strokeWidth="2.5" />
      <line x1="270" y1="268" x2="270" y2="284" stroke="#E85050" strokeWidth="2.5" />
      <line x1="488" y1="268" x2="484" y2="282" stroke="#E8C830" strokeWidth="2.5" />
      <line x1="492" y1="268" x2="496" y2="282" stroke="#444444" strokeWidth="2.5" />
      <line x1="490" y1="268" x2="490" y2="284" stroke="#E85050" strokeWidth="2.5" />
      {/* Cable run from ceiling down left wall */}
      <line x1="86" y1="180" x2="78" y2="345" stroke="#808080" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />

      {/* ─── STRUCTURE LINES ─── */}
      {/* Wall-floor junctions */}
      <line x1="200" y1="290" x2="600" y2="290" stroke="#888480" strokeWidth="2.5" />
      <line x1="60" y1="460" x2="200" y2="290" stroke="#888480" strokeWidth="2" />
      <line x1="740" y1="460" x2="600" y2="290" stroke="#888480" strokeWidth="2" />
      {/* Wall vertical corners */}
      <line x1="200" y1="80" x2="200" y2="290" stroke="#A0A098" strokeWidth="2" />
      <line x1="600" y1="80" x2="600" y2="290" stroke="#A0A098" strokeWidth="2" />
      {/* Ceiling-wall junctions */}
      <line x1="200" y1="80" x2="60" y2="180" stroke="#9A9692" strokeWidth="1.5" />
      <line x1="600" y1="80" x2="740" y2="180" stroke="#9A9692" strokeWidth="1.5" />
      <line x1="200" y1="80" x2="600" y2="80" stroke="#9A9692" strokeWidth="1.5" />
      <line x1="60" y1="180" x2="740" y2="180" stroke="#888480" strokeWidth="2" />
    </svg>
  )
}
