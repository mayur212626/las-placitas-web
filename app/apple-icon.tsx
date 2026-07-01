import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon for iOS home-screen install. */
export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '58px solid transparent',
            borderRight: '58px solid transparent',
            borderBottom: '96px solid #0a0807',
            marginBottom: 24,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
