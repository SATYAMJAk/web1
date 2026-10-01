import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, PHONE, PHONE_HREF } from "@/data/content";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink/95 backdrop-blur-xl shadow-2xl shadow-black/30"
          : "bg-ink/80 backdrop-blur-md"
      )}
    >
      {/* Gold top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Home"
        >
          <div className="relative overflow-hidden rounded-xl bg-white/95 p-1 shadow-lg ring-1 ring-gold-500/20 transition-all duration-300 group-hover:ring-gold-500/50 group-hover:shadow-gold-500/20">
            <img
              src="/images/logo.jpg"
              alt="Dr. Debasis Chakravarty"
              className="h-10 w-auto"
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "relative rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                  "text-white/75 hover:text-gold-400",
                  isActive && "text-gold-400"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(217,165,43,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-ink shadow-lg shadow-gold-500/20 transition-all duration-300 hover:bg-gold-400 hover:shadow-gold-400/30 hover:-translate-y-0.5 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">{PHONE}</span>
            <span className="xl:hidden">Call Now</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white transition-all duration-200 hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-ink/98 backdrop-blur-xl transition-all duration-300 lg:hidden",
          open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-4 pb-6 pt-3" aria-label="Mobile navigation">
          {NAV_LINKS.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  "text-white/75 hover:bg-white/5 hover:text-gold-400",
                  isActive && "bg-gold-500/10 text-gold-400"
                )
              }
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={PHONE_HREF}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold-500 py-3 text-sm font-bold uppercase tracking-wide text-ink"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}
