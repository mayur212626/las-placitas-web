import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Generated favicon — magma disc + obsidian volcano silhouette. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#ff9d2e,#ff5e1a 55%,#e11d62)',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '11px solid transparent',
            borderRight: '11px solid transparent',
            borderBottom: '18px solid #0a0807',
            marginBottom: 3,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
