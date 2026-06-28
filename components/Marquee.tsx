'use client';

/** Infinite horizontal marquee. Duplicates children for a seamless loop. */
export default function Marquee({
  items,
  className = '',
  itemClassName = '',
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((it, i) => (
        <span key={i} className={itemClassName}>
          {it}
        </span>
      ))}
    </div>
  );
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
