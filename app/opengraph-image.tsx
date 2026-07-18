import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Las Placitas — Fire-Born Mexican & Salvadoran';

/** Default social share card for the site. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 72,
          background: 'linear-gradient(135deg, #0a0807 55%, #2a0f08 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(255,94,26,0.55), rgba(225,29,98,0.15) 60%, transparent 75%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 120,
            top: 170,
            width: 0,
            height: 0,
            borderLeft: '130px solid transparent',
            borderRight: '130px solid transparent',
            borderBottom: '210px solid #14100d',
            display: 'flex',
          }}
        />
        <div style={{ display: 'flex', fontSize: 28, color: '#ff9d2e', letterSpacing: 10, textTransform: 'uppercase' }}>
          Fire-Born · Mexican & Salvadoran · Est. 1990
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 130,
            fontWeight: 800,
            color: '#f4eee2',
            lineHeight: 1,
            marginTop: 16,
          }}
        >
          LAS PLACITAS
        </div>
        <div style={{ display: 'flex', fontSize: 34, color: 'rgba(244,238,226,0.6)', marginTop: 18 }}>
          Pupusas · Fajitas · Mariscos · Margaritas — Washington, DC
        </div>
      </div>
    ),
    { ...size }
  );
}
