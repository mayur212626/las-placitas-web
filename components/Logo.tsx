/** Las Placitas crest — gold ring, volcano, sky, torogoz bird. Pure SVG. */
export default function Logo({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Las Placitas">
      <defs>
        <radialGradient id="sky" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#bfe6ff" />
          <stop offset="100%" stopColor="#3a8fd6" />
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6d970" />
          <stop offset="50%" stopColor="#e8b923" />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      {/* gold ring */}
      <circle cx="50" cy="50" r="46" fill="url(#ring)" />
      <circle cx="50" cy="50" r="40" fill="url(#sky)" />
      {/* clip the scene to inner circle */}
      <clipPath id="inner">
        <circle cx="50" cy="50" r="40" />
      </clipPath>
      <g clipPath="url(#inner)">
        {/* jungle base */}
        <rect x="10" y="64" width="80" height="30" fill="#1e5631" />
        {/* volcano */}
        <polygon points="50,28 78,72 22,72" fill="#3f5d4a" />
        <polygon points="50,28 64,50 36,50" fill="#5a7a63" opacity="0.6" />
        {/* crater steam */}
        <circle cx="50" cy="29" r="4" fill="#e9eef0" opacity="0.8" />
        <circle cx="54" cy="24" r="3" fill="#e9eef0" opacity="0.6" />
      </g>
      {/* torogoz bird (stylized) */}
      <g transform="translate(20 40)">
        <ellipse cx="0" cy="0" rx="5" ry="3.4" fill="#2bb673" />
        <circle cx="4.5" cy="-2" r="2.4" fill="#1b7f5a" />
        <path d="M6 -2 l3 -0.6 -2.4 1.6 Z" fill="#e8731c" />
        <rect x="-2" y="2.5" width="1.6" height="14" rx="0.8" fill="#1b7f5a" transform="rotate(12)" />
        <circle cx="-2" cy="17" r="2" fill="#2f6fb0" />
      </g>
    </svg>
  );
}
