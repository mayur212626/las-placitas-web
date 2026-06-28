/** Margarita glass illustration, tinted by accent. Salt rim, lime, straw. */
export default function DrinkArt({
  accent = '#e8b923',
  className = '',
}: {
  accent?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id={`dg-${accent}`} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06122b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`liq-${accent}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#dg-${accent})`} />

      {/* coupe / margarita bowl */}
      <path d="M26 30 L74 30 L54 56 L46 56 Z" fill={`url(#liq-${accent})`} />
      {/* glass rim outline */}
      <path d="M24 29 L76 29" stroke="#eafcff" strokeWidth="2.4" strokeLinecap="round" opacity="0.9" />
      {/* salt rim dots */}
      {[...Array(11)].map((_, i) => (
        <circle key={i} cx={26 + i * 4.8} cy={29} r="1.1" fill="#ffffff" opacity="0.85" />
      ))}
      {/* glass bowl outline */}
      <path d="M26 30 L74 30 L54 56 L46 56 Z" fill="none" stroke="#cfeaf2" strokeWidth="1.2" opacity="0.5" />
      {/* highlight */}
      <path d="M32 32 L40 32 L36 42 Z" fill="#ffffff" opacity="0.25" />

      {/* stem + foot */}
      <rect x="49" y="56" width="2" height="18" fill="#cfeaf2" opacity="0.7" />
      <ellipse cx="50" cy="76" rx="12" ry="3" fill="#cfeaf2" opacity="0.6" />

      {/* lime wedge on rim */}
      <path d="M68 28 a6 6 0 0 1 8 4 l-8 0 Z" fill="#9ac94f" />
      <path d="M68 28 a6 6 0 0 1 8 4" fill="none" stroke="#5a9e2e" strokeWidth="1" />

      {/* straw */}
      <line x1="58" y1="22" x2="50" y2="44" stroke="#d62828" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
