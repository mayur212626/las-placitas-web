import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0807',
        coal: '#14100d',
        smoke: '#221b16',
        magma: '#ff5e1a',
        ember: '#ff9d2e',
        blood: '#e11d62',
        acid: '#b6ff2e',
        ash: '#e8e2d8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'], // Anton — condensed heavy
        body: ['var(--font-body)', 'sans-serif'], // Space Grotesk
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        flicker: {
          '0%,100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.4' },
          '43%': { opacity: '1' },
          '45%': { opacity: '0.7' },
          '46%': { opacity: '1' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.9s ease forwards',
        marquee: 'marquee 26s linear infinite',
        marqueeRev: 'marqueeRev 26s linear infinite',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        flicker: 'flicker 5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
