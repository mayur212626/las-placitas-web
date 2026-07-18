import { ImageResponse } from 'next/og';
import { menu } from '@/lib/data';
import { photoFor } from '@/lib/photos';

export const runtime = 'edge';

/** Branded share card for a single dish: /api/og?dish=<Section-Name> */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dishId = searchParams.get('dish') ?? '';

  let name = 'Las Placitas';
  let desc = 'Fire-Born Mexican & Salvadoran · Washington, DC';
  let price = '';
  let photo: string | undefined;

  for (const sec of menu) {
    for (const it of sec.items) {
      if (`${sec.title}-${it.name}` === dishId) {
        name = it.name;
        desc = it.desc ?? desc;
        price = it.price ? `$${it.price}` : '';
        photo = photoFor(it.photo);
      }
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0807',
        }}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={560}
            height={630}
            style={{ objectFit: 'cover', width: 560, height: 630 }}
          />
        ) : (
          <div
            style={{
              width: 560,
              height: 630,
              display: 'flex',
              background: 'linear-gradient(135deg,#ff9d2e,#ff5e1a 55%,#e11d62)',
            }}
          />
        )}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 56,
          }}
        >
          <div style={{ display: 'flex', fontSize: 22, color: '#ff9d2e', letterSpacing: 8, textTransform: 'uppercase' }}>
            Las Placitas · DC
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 800, color: '#f4eee2', lineHeight: 1.05, marginTop: 14 }}>
            {name}
          </div>
          {price && (
            <div style={{ display: 'flex', fontSize: 54, color: '#ff5e1a', marginTop: 18, fontWeight: 700 }}>
              {price}
            </div>
          )}
          <div style={{ display: 'flex', fontSize: 26, color: 'rgba(244,238,226,0.65)', marginTop: 18, lineHeight: 1.4 }}>
            {desc.slice(0, 120)}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
