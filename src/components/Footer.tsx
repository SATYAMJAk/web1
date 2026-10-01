import { Link } from "react-router";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Twitter, Youtube, Clock, Mail, ArrowRight } from "lucide-react";
import { CLINICS, DOCTOR, EMAIL, HOURS_TOP, NAV_LINKS, PHONE, PHONE_HREF, SOCIALS, TREATMENTS } from "@/data/content";

const ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Top gradient accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 bg-cross-pattern-dark pointer-events-none" />
      <div
        className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,165,43,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,165,43,0.04) 0%, transparent 70%)" }}
      />

      {/* Main footer grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Column 1 — Doctor info */}
        <div className="lg:col-span-1">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/images/logo.jpg"
              alt="Dr. Debasis Chakravarty"
              className="h-12 w-auto rounded-lg bg-white/95 px-2 py-1 shadow-lg"
            />
          </div>

          {/* Doctor */}
          <div className="flex items-start gap-4">
            <img
              src="/images/doctor-portrait.jpg"
              alt={DOCTOR.name}
              className="h-16 w-16 flex-shrink-0 rounded-2xl object-cover ring-2 ring-gold-500/30"
            />
            <div>
              <p className="text-base font-extrabold uppercase leading-tight text-white">{DOCTOR.name}</p>
              <p className="mt-1 text-xs font-semibold text-gold-400">{DOCTOR.degrees}</p>
            </div>
          </div>

          <ul className="mt-4 space-y-1">
            {DOCTOR.roles.map((r) => (
              <li key={r} className="flex items-center gap-2 text-xs text-white/60">
                <span className="h-1 w-1 rounded-full bg-gold-500 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>

          {/* Contact info */}
          <div className="mt-6 space-y-3">
            <a href={PHONE_HREF} className="flex items-center gap-2 text-sm text-white/70 transition hover:text-gold-400">
              <Phone className="h-4 w-4 text-gold-500" /> {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm text-white/70 transition hover:text-gold-400">
              <Mail className="h-4 w-4 text-gold-500" /> {EMAIL}
            </a>
            <p className="flex items-center gap-2 text-sm text-white/60">
              <Clock className="h-4 w-4 text-gold-500" /> {HOURS_TOP}
            </p>
          </div>

          {/* Book CTA */}
          <a
            href={PHONE_HREF}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-5 py-3 text-xs font-bold uppercase tracking-wide text-ink shadow-lg shadow-gold-500/20 transition-all hover:bg-gold-400 hover:-translate-y-0.5"
          >
            <Phone className="h-3.5 w-3.5" /> Book Appointment
          </a>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h3 className="mb-6 text-sm font-extrabold uppercase tracking-widest text-white">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group flex items-center gap-2 text-sm text-white/60 transition-all hover:text-gold-400"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-gold-500/50 transition-transform group-hover:translate-x-1" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Treatments */}
        <div>
          <h3 className="mb-6 text-sm font-extrabold uppercase tracking-widest text-white">
            Treatments
          </h3>
          <ul className="space-y-3">
            {TREATMENTS.map((t) => (
              <li key={t.slug}>
                <Link
                  to={`/treatments#${t.slug}`}
                  className="group flex items-center gap-2 text-sm text-white/60 transition-all hover:text-gold-400"
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500/40 transition-colors group-hover:bg-gold-400" />
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Clinics + Social */}
        <div>
          <h3 className="mb-6 text-sm font-extrabold uppercase tracking-widest text-white">
            Visiting Hours
          </h3>
          <div className="space-y-6">
            {CLINICS.map((c) => (
              <div key={c.name} className="rounded-2xl border border-white/5 p-4 backdrop-blur-sm bg-white/[0.03]">
                <p className="flex items-center gap-2 text-xs font-bold text-gold-400">
                  <MapPin className="h-3.5 w-3.5" /> {c.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{c.address}</p>
                <p className="mt-2 text-xs font-semibold text-white">{c.days}</p>
                <p className="text-xs text-white/50">{c.time}</p>
              </div>
            ))}
          </div>

          {/* Social */}
          <h3 className="mb-4 mt-8 text-sm font-extrabold uppercase tracking-widest text-white">
            Follow Us
          </h3>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((s) => {
              const Icon = ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-gold-500/50 hover:bg-gold-500/10 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.07]">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-[12px]">
          {NAV_LINKS.filter((l) => l.to !== "/").map((l) => (
            <Link key={l.to} to={l.to} className="text-white/40 transition hover:text-gold-400">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="safe-bottom border-t border-white/[0.07] py-4 text-center text-[11px] text-white/30">
          Copyright © {new Date().getFullYear()}{" "}
          <span className="text-gold-500/70">{DOCTOR.name}</span>. All rights reserved.
          {" "}|{" "}
          <span>Manipal Hospitals, Kolkata</span>
        </div>
      </div>
    </footer>
  );
}
