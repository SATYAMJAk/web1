import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

export default function PageHero({
  title,
  crumb,
  subtitle,
}: {
  title: string;
  crumb: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-cross-pattern-dark" />

      {/* Gradient orbs */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,165,43,0.12) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[300px] w-[300px] translate-x-1/3 translate-y-1/3 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,165,43,0.08) 0%, transparent 70%)" }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(217,165,43,1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,165,43,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center">
        {/* Breadcrumb */}
        <nav
          className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/50 backdrop-blur-sm"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="flex items-center gap-1 transition hover:text-gold-400">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/30" />
          <span className="font-semibold text-gold-400">{crumb}</span>
        </nav>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
          <span className="text-gradient-gold">{title}</span>
        </h1>

        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">{subtitle}</p>
        )}

        {/* Decorative line */}
        <div className="mx-auto mt-8 h-0.5 w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      </div>

      {/* Bottom fade to white */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
}
