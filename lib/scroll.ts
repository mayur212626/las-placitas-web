/**
 * Hero scroll progress 0→1 across the pinned cinematic hero.
 * The hero section is ~2.6 viewports tall and stays sticky, so the dive
 * plays out over ~1.6 viewports of scrolling. Read inside useFrame.
 */
export function heroProgress(): number {
  if (typeof window === 'undefined') return 0;
  // gentle eruption ramp across the first viewport of scrolling
  const travel = window.innerHeight * 1.0;
  const p = window.scrollY / travel;
  return p < 0 ? 0 : p > 1 ? 1 : p;
}
