'use client';

import { useState } from 'react';
import { locations } from '@/lib/data';
import { useLang } from './i18n/LanguageProvider';

function milesBetween(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 3958.8;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export const directionsUrl = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

/** Geolocates the visitor and ranks both spots by distance. */
export default function NearestFinder() {
  const { t } = useLang();
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'denied'>('idle');
  const [dist, setDist] = useState<Record<string, number>>({});

  const locate = () => {
    if (!navigator.geolocation) {
      setState('denied');
      return;
    }
    setState('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const d: Record<string, number> = {};
        for (const l of locations) {
          d[l.id] = milesBetween(pos.coords.latitude, pos.coords.longitude, l.lat, l.lng);
        }
        setDist(d);
        setState('done');
      },
      () => setState('denied'),
      { timeout: 8000 }
    );
  };

  const nearestId =
    state === 'done'
      ? Object.entries(dist).sort((a, b) => a[1] - b[1])[0]?.[0]
      : null;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={locate}
          data-cursor
          disabled={state === 'loading'}
          className="rounded-full border border-magma/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-magma transition-colors hover:bg-magma hover:text-obsidian disabled:opacity-50"
        >
          {state === 'loading' ? '…' : `📍 ${t('near.cta')}`}
        </button>
        {state === 'denied' && (
          <span className="text-xs text-ash/50">{t('near.denied')}</span>
        )}
      </div>

      {state === 'done' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {locations.map((l) => {
            const nearest = l.id === nearestId;
            return (
              <div
                key={l.id}
                className={`flex items-center justify-between gap-3 rounded-2xl border p-4 ${
                  nearest ? 'border-acid/60 bg-acid/5' : 'border-ash/15'
                }`}
              >
                <div>
                  <p className="kinetic text-lg text-ash">
                    {l.name}
                    {nearest && (
                      <span className="ml-2 rounded-full bg-acid/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-acid">
                        {t('near.nearest')}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-ash/50">
                    {dist[l.id]?.toFixed(1)} {t('near.mi')}
                  </p>
                </div>
                <a
                  href={directionsUrl(l.lat, l.lng)}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="shrink-0 rounded-full bg-magma px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-obsidian transition-transform hover:scale-105"
                >
                  {t('near.directions')}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
