'use client';

import { TrackChip } from './OrderTracker';

/** Mounts the floating track-order chip; clicking opens the cart drawer in tracking view. */
export default function TrackChipMount() {
  return <TrackChip onClick={() => window.dispatchEvent(new Event('lp:track'))} />;
}
