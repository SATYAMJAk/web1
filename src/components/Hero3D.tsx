import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import { HERO_SLIDES, PHONE_HREF, STATS } from "@/data/content";
import { cn } from "@/lib/utils";

/* ── Animated particle dot ── */
function Particle({ style, i }: { style: React.CSSProperties, i: number }) {
  return (
    <div
      className="absolute rounded-full bg-gold-400 opacity-0"
      style={{
        ...style,
        animation: `particle-float ${6 + (i % 6)}s linear infinite`,
        animationDelay: `${i % 8}s`,
      }}
    />
  );
}

/* ── Floating medical cross badge ── */
function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "glass-dark absolute flex items-center gap-2 rounded-2xl px-4 py-3 text-white shadow-2xl",
        "animate-float",
        className
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ── 3D Rotating ring ── */
function OrbitRing({
  size,
  duration,
  color,
}: {
  size: number;
  duration: number;
  color: string;
}) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
      style={{
        width: size,
        height: size,
        borderColor: color,
        opacity: 0.18,
        animation: `rotate-slow ${duration}s linear infinite`,
        borderStyle: "dashed",
      }}
    />
  );
}

/* ── Counter inside hero stats ── */
function HeroCounter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 2000;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Main 3D Hero ── */
export default function Hero3D() {
  const [slide, setSlide] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Auto-advance slides
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Particle positions (seeded for consistency)
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    bottom: `-5%`,
    width: `${3 + (i % 4)}px`,
    height: `${3 + (i % 4)}px`,
  }));

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-ink"
      aria-label="Hero Section"
    >
      {/* ── Animated Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Deep space background overlay ── */}
      <div className="absolute inset-0">
        {/* Radial glow orbs */}
        <div
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(217,165,43,0.12) 0%, transparent 70%)",
            transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(217,165,43,0.07) 0%, transparent 70%)",
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(217,165,43,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(217,165,43,1) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              rgba(217,165,43,0.5) 60px,
              rgba(217,165,43,0.5) 61px
            )`,
          }}
        />
      </div>

      {/* ── Floating particles ── */}
      {particles.map((p, i) => (
        <Particle key={i} style={p} i={i} />
      ))}

      {/* ── Orbit rings around doctor image ── */}
      <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2">
          <OrbitRing size={520} duration={25} color="#d9a52b" />
          <OrbitRing size={400} duration={18} color="#d9a52b" />
          <OrbitRing size={280} duration={12} color="#f2dc92" />
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-0 px-4 pt-8 lg:grid-cols-2 lg:gap-8 lg:pt-0">
        {/* LEFT — Text content */}
        <div className="z-10 flex flex-col justify-center pb-10 pt-24 lg:py-0">
          {/* Top badge */}
          <div
            className="glass-gold mb-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gold-300 animate-slide-up"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold-400" />
            India's Premier Orthopaedic Surgeon
          </div>

          {/* Slide text */}
          <div key={slide} className="animate-heroFade">
            <p className="font-script text-2xl text-gold-400/80 sm:text-3xl">
              {HERO_SLIDES[slide].eyebrow}
            </p>
            <h1 className="mt-2 text-5xl font-extrabold leading-[1.1] text-white sm:text-6xl lg:text-7xl">
              <span className="text-gradient-gold">{HERO_SLIDES[slide].title}</span>
            </h1>
            <p className="mt-4 max-w-lg text-xl font-medium leading-relaxed text-white/70 sm:text-2xl">
              {HERO_SLIDES[slide].body}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap gap-4 animate-slide-up delay-300">
            <a
              href={PHONE_HREF}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-ink shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-500/40 hover:shadow-2xl glow-gold"
            >
              <Phone className="h-4 w-4" />
              Book Appointment
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <Link
              to="/treatments"
              className="inline-flex items-center gap-2 rounded-2xl border border-gold-500/40 px-8 py-4 text-sm font-bold uppercase tracking-widest text-gold-400 transition-all duration-300 hover:border-gold-500 hover:bg-gold-500/10 hover:-translate-y-1"
            >
              Our Treatments
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="mt-8 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === slide
                    ? "w-10 bg-gold-400 shadow-[0_0_10px_rgba(217,165,43,0.8)]"
                    : "w-4 bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="glass-dark rounded-2xl p-4 text-center animate-slide-up"
                style={{ animationDelay: `${0.5 + i * 0.15}s` }}
              >
                <p className="text-2xl font-extrabold text-gold-400 sm:text-3xl">
                  <HeroCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — 3D Doctor image with floating elements */}
        <div className="relative flex items-center justify-center py-10 lg:py-0">
          {/* Hexagonal glow backdrop */}
          <div
            className="absolute h-[500px] w-[500px] rounded-full animate-breathe"
            style={{
              background:
                "radial-gradient(circle, rgba(217,165,43,0.15) 0%, rgba(217,165,43,0.05) 50%, transparent 80%)",
              transform: `rotateX(${mousePos.y * 8}deg) rotateY(${mousePos.x * 8}deg)`,
              transition: "transform 0.3s ease",
            }}
          />

          {/* Doctor photo with 3D tilt */}
          <div
            className="relative z-10 animate-scale-in"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`,
              transition: "transform 0.3s ease",
            }}
          >
            {/* Decorative ring border */}
            <div className="absolute -inset-3 rounded-[2.5rem] border border-gold-500/20 animate-glow-pulse" />
            <div className="absolute -inset-6 rounded-[3rem] border border-gold-500/10" />

            <img
              src="/images/doctor-standing.webp"
              alt="Dr. Debasis Chakravarty — Joint Replacement & Trauma Surgeon"
              className="relative max-h-[560px] w-auto rounded-[2rem] object-cover shadow-2xl ring-2 ring-gold-500/30"
              style={{
                filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.6))",
              }}
            />

            {/* Experience badge — top left */}
            <FloatingBadge
              className="-left-6 top-8 sm:-left-16"
              delay={0}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 text-ink shadow-lg">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-white/60">Experience</p>
                <p className="text-base font-extrabold text-gold-400">32+ Years</p>
              </div>
            </FloatingBadge>

            {/* Surgeries badge — bottom right */}
            <FloatingBadge
              className="-right-6 bottom-16 sm:-right-16"
              delay={1}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-white/60">Successful</p>
                <p className="text-base font-extrabold text-emerald-400">5100+ Surgeries</p>
              </div>
            </FloatingBadge>

            {/* Hospital badge — bottom left */}
            <FloatingBadge
              className="-left-4 bottom-4 sm:-left-14"
              delay={2}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-white/60">At</p>
                <p className="text-sm font-bold text-blue-300">Manipal Hospitals</p>
              </div>
            </FloatingBadge>
          </div>

          {/* Orbiting dot */}
          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "orbit 12s linear infinite" }}
          >
            <div className="h-3 w-3 rounded-full bg-gold-400 shadow-[0_0_10px_rgba(217,165,43,0.8)]" />
          </div>
          <div
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "orbit 18s linear infinite reverse" }}
          >
            <div className="h-2 w-2 rounded-full bg-white/40" />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </div>

      {/* ── Bottom fade ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
