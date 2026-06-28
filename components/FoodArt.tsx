/**
 * Recognizable, hand-built SVG food illustrations — used in place of real
 * photography. Pick a `kind` per dish. Every scene sits on a ceramic plate.
 */
export type FoodKind =
  | 'plate'
  | 'skillet'
  | 'fish'
  | 'nachos'
  | 'soup'
  | 'salad'
  | 'steak'
  | 'burrito'
  | 'pupusa';

function Plate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <circle cx="50" cy="52" r="35" fill="#f4eee2" />
      <circle cx="50" cy="52" r="35" fill="none" stroke="#cbb27a" strokeWidth="1.6" />
      <circle cx="50" cy="52" r="28" fill="#efe7d6" />
      {children}
    </>
  );
}

function rice(cx: number, cy: number) {
  return <circle cx={cx} cy={cy} r="9" fill="#fbf7ec" stroke="#e6dcc4" strokeWidth="0.6" />;
}

export default function FoodArt({
  kind = 'plate',
  accent = '#e8b923',
  className = '',
}: {
  kind?: FoodKind;
  accent?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id={`fg-${kind}-${accent}`} cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor="#06122b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#fg-${kind}-${accent})`} />
      {render(kind, accent)}
    </svg>
  );
}

function render(kind: FoodKind, accent: string) {
  switch (kind) {
    case 'skillet':
      return (
        <>
          {/* cast-iron skillet */}
          <circle cx="50" cy="52" r="33" fill="#2b2b2b" />
          <circle cx="50" cy="52" r="27" fill="#3a3330" />
          <rect x="80" y="49" width="18" height="6" rx="3" fill="#1c1c1c" />
          {/* peppers & onions strips */}
          {[['#d62828', 0], ['#2f7d31', 1.2], ['#e8b923', 2.4], ['#e8731c', 3.6], ['#d62828', 4.8]].map(
            ([c, a], i) => (
              <rect
                key={i}
                x={44}
                y={36 + i * 5}
                width="14"
                height="3.4"
                rx="1.7"
                fill={c as string}
                transform={`rotate(${(a as number) * 14} 50 52)`}
              />
            )
          )}
          {/* steak strips */}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={40 + i * 6} y={50} width="6" height="10" rx="2" fill="#5a3520" />
          ))}
          <ellipse cx="50" cy="34" rx="10" ry="3" fill="#fff" opacity="0.12" />
        </>
      );
    case 'fish':
      return (
        <Plate>
          {rice(36, 50)}
          {/* fish body */}
          <ellipse cx="56" cy="52" rx="18" ry="8" fill={accent} />
          <path d="M74 52 l8 -6 0 12 Z" fill={accent} />
          <circle cx="46" cy="50" r="1.5" fill="#1a1a1a" />
          {/* grill lines */}
          {[0, 1, 2].map((i) => (
            <line key={i} x1={48 + i * 7} y1="46" x2={45 + i * 7} y2="58" stroke="#7a4a1f" strokeWidth="1" />
          ))}
          {/* lime + herb */}
          <circle cx="40" cy="64" r="3" fill="#9ac94f" />
          <circle cx="62" cy="42" r="2" fill="#3f7d3f" />
        </Plate>
      );
    case 'nachos':
      return (
        <Plate>
          {/* chips */}
          {[
            [40, 44, -20],
            [54, 42, 25],
            [60, 54, -10],
            [44, 58, 15],
            [50, 50, 0],
          ].map(([x, y, r], i) => (
            <polygon
              key={i}
              points="0,-9 8,7 -8,7"
              fill="#e7c061"
              transform={`translate(${x} ${y}) rotate(${r})`}
            />
          ))}
          {/* cheese drizzle */}
          <ellipse cx="50" cy="52" rx="20" ry="13" fill="#f0a91e" opacity="0.5" />
          {/* toppings */}
          <circle cx="44" cy="48" r="3" fill="#d62828" />
          <circle cx="58" cy="50" r="2.6" fill="#e8731c" />
          <circle cx="50" cy="58" r="2.6" fill="#3f7d3f" />
          <circle cx="54" cy="44" r="2.2" fill="#fff" opacity="0.9" />
        </Plate>
      );
    case 'soup':
      return (
        <>
          {/* bowl */}
          <circle cx="50" cy="52" r="33" fill="#f4eee2" />
          <circle cx="50" cy="52" r="26" fill={accent} opacity="0.5" />
          <circle cx="50" cy="52" r="26" fill="none" stroke="#cbb27a" strokeWidth="1.4" />
          {/* mussels / shrimp */}
          <ellipse cx="42" cy="48" rx="5" ry="3" fill="#2b2b3a" transform="rotate(-20 42 48)" />
          <ellipse cx="58" cy="50" rx="5" ry="3" fill="#2b2b3a" transform="rotate(20 58 50)" />
          <path d="M48 58 a4 4 0 1 1 6 0" fill="none" stroke="#e8731c" strokeWidth="3" strokeLinecap="round" />
          <circle cx="52" cy="44" r="2.5" fill="#d62828" />
          <circle cx="44" cy="58" r="2" fill="#3f7d3f" />
          {/* steam */}
          <path d="M44 30 q3 -4 0 -8" stroke="#fff" strokeWidth="1.4" fill="none" opacity="0.4" />
          <path d="M56 30 q3 -4 0 -8" stroke="#fff" strokeWidth="1.4" fill="none" opacity="0.4" />
        </>
      );
    case 'salad':
      return (
        <Plate>
          {/* tortilla bowl */}
          <circle cx="50" cy="52" r="24" fill="#e7c061" />
          <circle cx="50" cy="52" r="19" fill="#3f7d3f" />
          {/* greens */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={50 + Math.cos((i / 8) * 6.28) * 12}
              cy={52 + Math.sin((i / 8) * 6.28) * 9}
              r="4"
              fill={i % 2 ? '#5aa641' : '#79c34f'}
            />
          ))}
          {/* shrimp on top */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d="M0 0 a4 4 0 1 1 5 0"
              fill="none"
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
              transform={`translate(${44 + i * 6} ${46}) rotate(${i * 40})`}
            />
          ))}
          <circle cx="56" cy="58" r="2.4" fill="#d62828" />
        </Plate>
      );
    case 'steak':
      return (
        <Plate>
          {rice(38, 48)}
          {/* steak */}
          <rect x="46" y="44" width="22" height="16" rx="4" fill="#5a3520" transform="rotate(-8 57 52)" />
          <rect x="46" y="44" width="22" height="16" rx="4" fill="none" stroke="#3a2012" strokeWidth="1" transform="rotate(-8 57 52)" />
          {/* sautéed onions/peppers on top */}
          {[['#e8b923', 0], ['#d62828', 1], ['#2f7d31', 2]].map(([c, i]) => (
            <path
              key={i as number}
              d="M0 0 q6 -3 12 0"
              fill="none"
              stroke={c as string}
              strokeWidth="2.4"
              strokeLinecap="round"
              transform={`translate(${48} ${50 + (i as number) * 3}) rotate(-8)`}
            />
          ))}
          {/* plantain */}
          <ellipse cx="40" cy="64" rx="6" ry="3" fill="#caa13c" transform="rotate(20 40 64)" />
        </Plate>
      );
    case 'burrito':
      return (
        <Plate>
          {/* burrito */}
          <rect x="34" y="44" width="32" height="16" rx="8" fill="#ead9a0" transform="rotate(-12 50 52)" />
          <rect x="34" y="44" width="32" height="16" rx="8" fill="none" stroke="#cbb27a" strokeWidth="1" transform="rotate(-12 50 52)" />
          {/* melted cheese + sauce */}
          <ellipse cx="50" cy="50" rx="18" ry="6" fill="#f0a91e" opacity="0.45" transform="rotate(-12 50 50)" />
          <circle cx="64" cy="60" r="4" fill="#fbf7ec" />
          <path d="M58 62 q3 -3 6 0" stroke="#3f7d3f" strokeWidth="2" fill="none" />
        </Plate>
      );
    case 'pupusa':
      return (
        <Plate>
          <circle cx="50" cy="52" r="17" fill="#e7c982" />
          <circle cx="44" cy="48" r="3.5" fill="#b9893f" />
          <circle cx="56" cy="55" r="2.6" fill="#b9893f" />
          {/* curtido */}
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x="48"
              y="34"
              width="5"
              height="1.8"
              rx="0.9"
              fill={i % 2 ? '#cfe06a' : '#e8731c'}
              transform={`rotate(${i * 60} 50 52) translate(0 -20)`}
            />
          ))}
        </Plate>
      );
    default:
      return (
        <Plate>
          {rice(38, 50)}
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={50 + Math.cos((i / 5) * 6.28) * 13}
              cy={54 + Math.sin((i / 5) * 6.28) * 9}
              r={5 + (i % 2) * 2}
              fill={accent}
              opacity={0.7}
            />
          ))}
          <circle cx="58" cy="42" r="2.6" fill="#3f7d3f" />
          <circle cx="44" cy="64" r="2.4" fill="#d62828" />
        </Plate>
      );
  }
}
