export default function TurnkeyRoomSVG() {
  const plankLine = (y: number) => {
    const t = (y - 290) / 170
    return { x1: 200 - 140 * t, x2: 600 + 140 * t }
  }

  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        <linearGradient id="t-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A9BD4" />
          <stop offset="55%" stopColor="#90C8E8" />
          <stop offset="100%" stopColor="#8AC890" />
        </linearGradient>
        <linearGradient id="t-floor" x1="0" y1="0" x2="0.05" y2="0">
          <stop offset="0%" stopColor="#BE9E60" />
          <stop offset="50%" stopColor="#D4B478" />
          <stop offset="100%" stopColor="#BA9858" />
        </linearGradient>
        <linearGradient id="t-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0EDE6" />
          <stop offset="100%" stopColor="#E8E4DC" />
        </linearGradient>
        <linearGradient id="t-ceil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8F6F2" />
          <stop offset="100%" stopColor="#EEEAE4" />
        </linearGradient>
        <radialGradient id="t-glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8E0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFF8E0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="t-glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF8E0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFF8E0" stopOpacity="0" />
        </radialGradient>
        <clipPath id="t-floor-clip">
          <polygon points="60,460 740,460 600,290 200,290" />
        </clipPath>
      </defs>

      {/* Background (garden through window) */}
      <rect width="800" height="500" fill="#4A8A5A" />
      {/* Distant garden trees */}
      <rect x="0" y="0" width="800" height="200" fill="#5A9870" opacity="0.4" />

      {/* ─── FLOOR, oak laminate ─── */}
      <polygon points="60,460 740,460 600,290 200,290" fill="#C09A58" />
      {/* Wood plank horizontal lines */}
      {[300, 312, 325, 338, 352, 366, 381, 397, 414, 432, 450].map((y) => {
        const l = plankLine(y)
        return (
          <line key={y} x1={l.x1} y1={y} x2={l.x2} y2={y}
            stroke="#A07A40" strokeWidth="1" opacity="0.55"
          />
        )
      })}
      {/* Plank vertical breaks (staggered) */}
      {[
        [310, 320], [430, 332], [340, 345], [500, 358],
        [270, 372], [460, 387], [350, 403], [530, 420],
        [290, 437], [480, 452],
      ].map(([x, y], i) => {
        const t = (y - 290) / 170
        const floorLeft = 200 - 140 * t
        const floorWidth = 400 + 280 * t
        const screenX = floorLeft + ((x - 200) / 400) * floorWidth
        return (
          <line key={i} x1={screenX} y1={y} x2={screenX} y2={Math.min(y + 12, 460)}
            stroke="#A07A40" strokeWidth="0.7" opacity="0.4"
          />
        )
      })}
      {/* Floor sheen */}
      <polygon points="60,460 740,460 600,290 200,290" fill="rgba(255,255,200,0.06)" />

      {/* ─── BACK WALL, white painted ─── */}
      <polygon points="200,80 600,80 600,290 200,290" fill="url(#t-back)" />

      {/* ─── WINDOW, white PVC frame with glazing ─── */}
      {/* Frame */}
      <rect x="252" y="102" width="224" height="116" rx="2" fill="#E8E6E2" />
      {/* Glazing */}
      <rect x="258" y="108" width="206" height="104" fill="url(#t-sky)" />
      {/* Transom bar */}
      <rect x="258" y="158" width="206" height="4" fill="#E8E6E2" />
      {/* Mullion */}
      <rect x="358" y="108" width="4" height="104" fill="#E8E6E2" />
      {/* Frame shadow edge */}
      <rect x="252" y="102" width="224" height="116" rx="2" fill="none"
        stroke="#D0CCC8" strokeWidth="2" />
      {/* Windowsill */}
      <rect x="248" y="216" width="232" height="9" rx="1" fill="#DEDAD4" />
      <rect x="248" y="222" width="232" height="4" rx="1" fill="#C8C4BC" opacity="0.5" />
      {/* Reflection on glass */}
      <rect x="260" y="110" width="50" height="80" fill="rgba(255,255,255,0.12)" rx="1" />

      {/* ─── KITCHEN, left side of back wall ─── */}
      {/* Upper cabinets */}
      <rect x="203" y="115" width="52" height="68" rx="1" fill="#DEDAD4" />
      <rect x="205" y="117" width="48" height="64" rx="1" fill="#D4D0CA" />
      <line x1="229" y1="117" x2="229" y2="181" stroke="#C4C0BA" strokeWidth="0.8" />
      {/* Handles */}
      <rect x="219" y="147" width="10" height="3" rx="1" fill="#A8A4A0" />
      <rect x="236" y="147" width="10" height="3" rx="1" fill="#A8A4A0" />
      {/* Lower cabinets */}
      <rect x="203" y="247" width="52" height="45" rx="1" fill="#DEDAD4" />
      <rect x="205" y="249" width="48" height="41" rx="1" fill="#D4D0CA" />
      <line x1="229" y1="249" x2="229" y2="290" stroke="#C4C0BA" strokeWidth="0.8" />
      <rect x="219" y="264" width="10" height="3" rx="1" fill="#A8A4A0" />
      <rect x="236" y="264" width="10" height="3" rx="1" fill="#A8A4A0" />
      {/* Worktop */}
      <rect x="201" y="242" width="56" height="8" rx="1" fill="#888078" />
      {/* Splashback */}
      <rect x="203" y="185" width="52" height="58" fill="#E0DCD4" />
      <rect x="203" y="185" width="52" height="58" fill="rgba(255,255,255,0.3)" />

      {/* ─── KITCHEN, right side of back wall ─── */}
      {/* Upper cabinets */}
      <rect x="494" y="115" width="104" height="68" rx="1" fill="#DEDAD4" />
      <rect x="496" y="117" width="100" height="64" rx="1" fill="#D4D0CA" />
      <line x1="546" y1="117" x2="546" y2="181" stroke="#C4C0BA" strokeWidth="0.8" />
      <rect x="532" y="147" width="12" height="3" rx="1" fill="#A8A4A0" />
      <rect x="551" y="147" width="12" height="3" rx="1" fill="#A8A4A0" />
      {/* Lower cabinets */}
      <rect x="494" y="247" width="104" height="45" rx="1" fill="#DEDAD4" />
      <rect x="496" y="249" width="100" height="41" rx="1" fill="#D4D0CA" />
      <line x1="546" y1="249" x2="546" y2="290" stroke="#C4C0BA" strokeWidth="0.8" />
      <rect x="532" y="264" width="12" height="3" rx="1" fill="#A8A4A0" />
      <rect x="551" y="264" width="12" height="3" rx="1" fill="#A8A4A0" />
      {/* Worktop */}
      <rect x="492" y="242" width="110" height="8" rx="1" fill="#888078" />
      {/* Splashback */}
      <rect x="494" y="185" width="104" height="58" fill="#E0DCD4" />
      <rect x="494" y="185" width="104" height="58" fill="rgba(255,255,255,0.3)" />

      {/* ─── LEFT WALL, white painted ─── */}
      <polygon points="60,180 200,80 200,290 60,460" fill="#EAE6DE" />
      {/* Subtle shadow */}
      <polygon points="60,180 200,80 200,290 60,460" fill="rgba(0,0,0,0.06)" />
      {/* Wall outlet */}
      <rect x="70" y="360" width="18" height="13" rx="1" fill="#DEDAD2" stroke="#C8C4BC" strokeWidth="1" />
      <circle cx="79" cy="366" r="2" fill="#C8C4BC" />

      {/* ─── RIGHT WALL, white painted ─── */}
      <polygon points="740,180 600,80 600,290 740,460" fill="#EDEAE4" />
      <polygon points="740,180 600,80 600,290 740,460" fill="rgba(0,0,0,0.04)" />

      {/* ─── SKIRTING BOARDS ─── */}
      <line x1="200" y1="289" x2="600" y2="289" stroke="#F0EDE8" strokeWidth="5" />
      <polygon points="60,457 200,287 200,292 62,460" fill="#ECEAE4" />
      <polygon points="740,457 600,287 600,292 738,460" fill="#EDEAE6" />

      {/* ─── CEILING, smooth white with downlights ─── */}
      <polygon points="60,180 740,180 600,80 200,80" fill="url(#t-ceil)" />
      {/* Downlights, 3 recessed */}
      {[250, 400, 550].map((fx, i) => {
        // back-x perspective: 200 + (fx-60)/(680)*400
        const bx = 200 + ((fx - 60) / 680) * 400
        const cx = (fx + bx) / 2
        const cy = 110 + i * 10 - 10
        return (
          <g key={i}>
            {/* Glow spread */}
            <ellipse cx={cx} cy={cy} rx={70} ry={45}
              fill={`url(#t-glow${i === 1 ? 1 : 2})`} opacity="0.45" />
            {/* Housing ring */}
            <ellipse cx={cx} cy={cy} rx={11} ry={6} fill="#DEDAD4" />
            {/* Bulb */}
            <ellipse cx={cx} cy={cy} rx={7} ry={4} fill="#FFF8E0" />
          </g>
        )
      })}

      {/* ─── SOFA ─── */}
      {/* Rug */}
      <polygon points="145,448 435,448 415,370 165,370" fill="#8090A8" opacity="0.45" />
      {/* Sofa base/body */}
      <polygon points="168,378 398,378 378,318 188,318" fill="#2A3C52" />
      {/* Sofa back */}
      <polygon points="168,378 188,318 188,298 166,352" fill="#22324A" />
      <polygon points="398,378 378,318 378,298 400,352" fill="#1E2C42" />
      {/* Seat cushions */}
      <polygon points="193,378 283,378 275,318 200,318" fill="#344858" />
      <line x1="283" y1="378" x2="275" y2="318" stroke="#2A3C52" strokeWidth="1.5" />
      <polygon points="286,378 374,378 364,318 278,318" fill="#344858" />
      {/* Scatter cushion */}
      <polygon points="310,318 345,318 342,296 307,296" fill="#DEB32F" rx="2" />
      <polygon points="310,318 345,318 342,296 307,296" fill="rgba(0,0,0,0.1)" />
      {/* Sofa legs */}
      <rect x="172" y="378" width="8" height="14" rx="1" fill="#7A6040" />
      <rect x="380" y="378" width="8" height="14" rx="1" fill="#7A6040" />
      {/* Arm rests */}
      <polygon points="162,378 172,378 172,298 162,340" fill="#2A3C52" />
      <polygon points="388,378 400,378 400,340 388,298" fill="#1E2C42" />

      {/* ─── COFFEE TABLE ─── */}
      <polygon points="208,425 388,425 378,400 218,400" fill="#B89050" />
      <rect x="221" y="425" width="8" height="16" rx="1" fill="#907040" />
      <rect x="360" y="425" width="8" height="16" rx="1" fill="#907040" />
      {/* Table surface items */}
      <ellipse cx="285" cy="411" rx="15" ry="8" fill="#D8C890" opacity="0.7" />
      <rect x="305" y="406" width="20" height="14" rx="1" fill="#C8B070" opacity="0.6" />

      {/* ─── PLANT left corner ─── */}
      <rect x="78" y="345" width="22" height="30" rx="3" fill="#5A7830" />
      <ellipse cx="89" cy="342" rx="22" ry="30" fill="#2D6030" />
      <ellipse cx="74" cy="330" rx="14" ry="20" fill="#347034" />
      <ellipse cx="104" cy="327" rx="15" ry="21" fill="#2E6A2E" />
      <ellipse cx="89" cy="310" rx="12" ry="18" fill="#3A7A3A" />

      {/* ─── WALL-FLOOR JUNCTION LINES ─── */}
      <line x1="200" y1="290" x2="600" y2="290" stroke="#C0B898" strokeWidth="2" />
      <line x1="60" y1="460" x2="200" y2="290" stroke="#C0B898" strokeWidth="1.5" />
      <line x1="740" y1="460" x2="600" y2="290" stroke="#C0B898" strokeWidth="1.5" />

      {/* ─── WALL CORNER LINES ─── */}
      <line x1="200" y1="80" x2="200" y2="290" stroke="#D4D0C8" strokeWidth="1.5" />
      <line x1="600" y1="80" x2="600" y2="290" stroke="#D4D0C8" strokeWidth="1.5" />
      <line x1="200" y1="80" x2="600" y2="80" stroke="#D4D0C8" strokeWidth="1.5" />
      <line x1="200" y1="80" x2="60" y2="180" stroke="#D0CCC4" strokeWidth="1.5" />
      <line x1="600" y1="80" x2="740" y2="180" stroke="#D0CCC4" strokeWidth="1.5" />
      <line x1="60" y1="180" x2="740" y2="180" stroke="#C4C0B8" strokeWidth="2" />

      {/* Warm ambient overlay */}
      <rect width="800" height="500" fill="rgba(255,240,200,0.04)" />
    </svg>
  )
}
