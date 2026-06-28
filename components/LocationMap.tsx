'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const points = [
  { name: 'Capitol Hill', addr: '1100 8th St SE', lat: 38.8846, lng: -76.9956 },
  { name: 'Las Placitas Dos', addr: '3614 14th St NW', lat: 38.9359, lng: -77.0325 },
];

/** Free dark-themed Leaflet map (CartoDB tiles, no API key) with both DC spots. */
export default function LocationMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: import('leaflet').Map | null = null;
    let cancelled = false;

    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !ref.current || ref.current.dataset.init) return;
      ref.current.dataset.init = '1';

      map = L.map(ref.current, { scrollWheelZoom: false, attributionControl: false }).setView(
        [38.91, -77.014],
        12
      );

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { maxZoom: 19, subdomains: 'abcd' }
      ).addTo(map);

      const icon = L.divIcon({
        className: '',
        html: `<div style="width:22px;height:22px;border-radius:50%;background:#ff5e1a;box-shadow:0 0 0 6px rgba(255,94,26,0.25),0 0 18px rgba(255,94,26,0.8);border:2px solid #14100d"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      points.forEach((p) => {
        L.marker([p.lat, p.lng], { icon })
          .addTo(map!)
          .bindPopup(`<strong>${p.name}</strong><br/>${p.addr}`);
      });
    })();

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 [&_.leaflet-container]:bg-coal"
      aria-label="Map of Las Placitas locations"
    />
  );
}
