import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-x flex flex-col items-center justify-between gap-6 text-sm text-ash/50 md:flex-row">
        <a href="/" className="flex items-center gap-3">
          <Logo className="h-9 w-9" />
          <span className="kinetic text-xl text-ash">Las Placitas</span>
        </a>
        <p>www.lasplacitasrestaurant.com · Catering available</p>
        <p>© {new Date().getFullYear()} Mayur Patil · All rights reserved</p>
      </div>
    </footer>
  );
}
