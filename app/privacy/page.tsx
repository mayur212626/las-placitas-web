import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How this site stores your data.',
};

const sections = [
  {
    h: 'What we store',
    p: 'Your cart, favorites, language choice, past orders and cookie consent are saved in your browser (localStorage) only. Nothing is sent to a server or shared with anyone.',
  },
  {
    h: 'Analytics',
    p: 'We use privacy-friendly, cookie-less page analytics to understand traffic. No personal profiles are built and no data is sold.',
  },
  {
    h: 'Photos',
    p: 'Dish photography is loaded from Unsplash, which may see your IP address when images load, as with any image CDN.',
  },
  {
    h: 'Your control',
    p: 'Clearing your browser storage for this site removes everything we keep. There are no accounts and no server-side records.',
  },
  {
    h: 'Contact',
    p: 'Questions? Call either location or reach out through the contact page.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pb-28 pt-32">
      <div className="container-x max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-magma">Legal</p>
        <h1 className="mt-3 kinetic text-5xl text-ash md:text-7xl">
          Privacy <span className="text-magma-grad">Policy</span>
        </h1>
        <p className="mt-4 text-sm text-ash/50">
          This is a portfolio concept site. Short version: your data stays on your device.
        </p>
        <div className="mt-12 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="kinetic text-2xl text-magma-grad">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-ash/70">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
