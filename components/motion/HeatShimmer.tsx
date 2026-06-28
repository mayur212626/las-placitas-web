'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * Molten heat-haze distortion via an animated SVG displacement filter.
 * Ramps up on hover, eases back on leave.
 */
export default function HeatShimmer({
  children,
  className = '',
  max = 16,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const fid = `hs-${useId().replace(/:/g, '')}`;
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    let raf = 0;
    let cur = 0;
    const loop = () => {
      const target = hover ? max : 0;
      cur += (target - cur) * 0.12;
      if (disp.current) disp.current.setAttribute('scale', cur.toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover, max]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ filter: `url(#${fid})` }}
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves={2}
            seed={5}
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="7s"
              values="0.012 0.02;0.022 0.012;0.012 0.02"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            ref={disp}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      {children}
    </div>
  );
}
