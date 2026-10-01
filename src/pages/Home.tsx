import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  Quote,
  Star,
  Award,
  Activity,
  Heart,
} from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";
import SmoothCarousel3D from "@/components/SmoothCarousel3D";
import SectionHeading from "@/components/SectionHeading";
import Hero3D from "@/components/Hero3D";
import {
  BLOG_POSTS,
  DOCTOR,
  PUBLICATIONS,
  STATS,
  TESTIMONIALS,
  TREATMENTS,
  WHY_POINTS,
} from "@/data/content";
import { cn } from "@/lib/utils";

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── Animated counter ─── */
function Counter({ value, suffix }: { value: number; suffix: string }) {
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
      { threshold: 0.4 }
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

/* ─── TreatmentCard with 3D hover ─── */
function TreatmentCard({ t }: { t: { slug: string; title: string; short: string; image: string } }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) translateY(-6px)`;
    el.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(217,165,43,0.15), 0 30px 60px rgba(0,0,0,0.2)`;
  };
  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
  };

  return (
    <Link
      ref={cardRef}
      to={`/treatments#${t.slug}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-zinc-100 transition-all duration-500"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={t.image}
          alt={t.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {/* Arrow icon */}
        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-all duration-300 group-hover:bg-gold-500 group-hover:scale-110">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500 group-hover:w-full" />

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-gold-600">
          {t.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{t.short}</p>
      </div>
    </Link>
  );
}

/* ─── About Intro + Appointment Form ─── */
function Intro() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 50%, #d9a52b 0%, transparent 60%)`,
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:py-24">
        {/* Appointment Form — floats up from below */}
        <div
          className={cn(
            "transition-all duration-700 lg:-mt-40 lg:pr-4",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="relative z-10 rounded-3xl shadow-2xl">
            <AppointmentForm />
          </div>
        </div>

        {/* Doctor bio */}
        <div
          className={cn(
            "flex flex-col justify-center transition-all duration-700 delay-200",
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
            <Award className="h-3.5 w-3.5" /> About the Doctor
          </span>

          <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight text-ink sm:text-4xl">
            {DOCTOR.name}
          </h2>
          <p className="mt-2 text-base font-semibold text-gold-600">{DOCTOR.degrees}</p>

          {/* Roles with animated dots */}
          <ul className="mt-4 space-y-2">
            {DOCTOR.roles.map((r) => (
              <li key={r} className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>

          <p className="mt-5 leading-relaxed text-zinc-600">
            With more than three decades in orthopaedics, Dr. Chakravarty is one of India's most
            experienced joint replacement and trauma surgeons. His practice covers replacement of the
            hip, knee, shoulder and elbow, complex revision surgery, and trauma across the whole skeleton.
          </p>
          <p className="mt-3 leading-relaxed text-zinc-600">
            He is a member of the Medical Council of India (MCI) and is known for combining surgical
            precision with genuinely personal, unhurried care.
          </p>

          {/* Inline stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 p-4 text-center ring-1 ring-gold-200"
              >
                <p className="text-2xl font-extrabold text-gold-600">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gold-700/70">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 rounded-2xl bg-ink px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:bg-gold-500 hover:text-ink hover:-translate-y-1 hover:shadow-gold-500/30 hover:shadow-2xl"
            >
              Full Profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Treatments Section ─── */
function Treatments() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-50" />
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Best Orthopaedic, Joint Replacement & Trauma Care!"
          title="Amazing Services & Treatments"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TREATMENTS.slice(0, 6).map((t, i) => (
            <div
              key={t.slug}
              className={cn(
                "transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <TreatmentCard t={t} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/treatments"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-xl transition-all duration-300 hover:bg-gold-400 hover:-translate-y-1 hover:shadow-gold-400/40 hover:shadow-2xl"
          >
            View All Treatments <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink/20 bg-ink px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-ink hover:-translate-y-1"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Publications + Stats ─── */
function Publications() {
  const [i, setI] = useState(0);
  const visible_count = 2;
  const max = PUBLICATIONS.length - visible_count;
  const { ref, visible } = useReveal();

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-20 lg:py-28">
      {/* bg cross pattern */}
      <div className="absolute inset-0 bg-cross-pattern-dark" />
      {/* Gold radial */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,165,43,0.08) 0%, transparent 70%)" }} />

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading
          eyebrow="Regional, National & International"
          title="Presentations & Publications"
          dark
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          {/* Image with 3D frame */}
          <div
            className={cn(
              "relative transition-all duration-700",
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="absolute -inset-2 rounded-3xl border border-gold-500/20" />
            <div className="absolute -inset-4 rounded-[2rem] border border-gold-500/10" />
            <img
              src="/images/doctor-desk.jpg"
              alt="Dr. Debasis Chakravarty at his desk"
              className="relative w-full rounded-2xl object-cover shadow-2xl"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
            />
            {/* Floating label */}
            <div className="glass-gold absolute -bottom-5 left-6 rounded-2xl px-5 py-3">
              <p className="text-sm font-bold text-gold-300">130+ International Seminars</p>
            </div>
          </div>

          {/* Publications carousel */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            <div className="space-y-4">
              {PUBLICATIONS.slice(i, i + visible_count).map((p) => (
                <div
                  key={p.authors}
                  className="glass-dark rounded-2xl p-5 ring-1 ring-gold-500/10 transition-all duration-300 hover:ring-gold-500/30"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    {p.authors}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{p.detail}</p>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  aria-label="Previous publications"
                  onClick={() => setI((v) => (v - 1 + PUBLICATIONS.length) % (max + 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-400 transition-all hover:bg-gold-500 hover:text-ink hover:border-gold-500"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  aria-label="Next publications"
                  onClick={() => setI((v) => (v + 1) % (max + 1))}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500 text-ink transition-all hover:bg-gold-400"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <Link
                to="/publications"
                className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-gold-400 transition hover:text-gold-300"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-gold-500/20 sm:grid-cols-3">
          {STATS.map((s, idx) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col items-center gap-2 bg-ink py-10 text-center transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${0.3 + idx * 0.15}s` }}
            >
              <p className="text-5xl font-extrabold text-gradient-gold sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
function WhyBand() {
  const { ref, visible } = useReveal();
  const icons = [Activity, Heart, Award, BadgeCheck];

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      {/* Animated gold background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #d9a52b 0%, #f2dc92 50%, #b58320 100%)",
        }}
      />
      <div className="absolute inset-0 bg-cross-pattern" />
      {/* Bokeh circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-20 h-80 w-80 rounded-full bg-ink/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        {/* Image */}
        <div
          className={cn(
            "transition-all duration-700",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] border-2 border-ink/10" />
            <img
              src="/images/surgery.jpg"
              alt="Surgery in progress"
              className="w-full rounded-[2rem] object-cover shadow-2xl"
              style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.3))" }}
            />
            {/* Floating stats on image */}
            <div className="glass-dark absolute -right-6 top-8 rounded-2xl px-5 py-4">
              <p className="text-3xl font-extrabold text-gold-400">32+</p>
              <p className="text-xs text-white/60 uppercase tracking-wider">Years Expert</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={cn(
            "transition-all duration-700 delay-200",
            visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}
        >
          <p className="font-script text-3xl text-ink/70 sm:text-4xl">
            Best Orthopaedic, Joint Replacement & Trauma Care!
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
            For your loved ones
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            Trusted by thousands of patients across India and abroad, Dr. Chakravarty combines
            world-class surgical expertise with compassionate, patient-first care.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {WHY_POINTS.map((p, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <li
                  key={p}
                  className="flex items-center gap-3 rounded-2xl bg-white/30 px-5 py-4 font-bold text-ink backdrop-blur-sm transition-all duration-300 hover:bg-white/50 hover:-translate-y-1"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ink text-gold-400 shadow-lg">
                    <Icon className="h-5 w-5" />
                  </span>
                  {p}
                </li>
              );
            })}
          </ul>

          <a
            href="#book"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-ink px-9 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-all duration-300 hover:bg-gold-900 hover:-translate-y-1 hover:shadow-ink/50"
          >
            Book Appointment <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-50" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="What Patients Say" title="Patient's Speak" />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 6).map((t, i) => (
            <figure
              key={t.name}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-7 shadow-lg ring-1 ring-zinc-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold-200",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Gold accent corner */}
              <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-bl-3xl rounded-tr-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 opacity-10 transition-opacity group-hover:opacity-20" />
              </div>

              {/* Stars */}
              <div className="mb-3 flex gap-1">
                {Array(5).fill(0).map((_, s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              <div>
                <Quote className="h-8 w-8 fill-gold-500/20 text-gold-500" />
                <blockquote className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {t.text}
                </blockquote>
              </div>

              {/* Bottom accent line */}
              <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-extrabold text-white shadow-md">
                    {t.name[0]}
                  </div>
                  <figcaption className="text-sm font-bold text-ink">{t.name}</figcaption>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
                  Patient
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Doctor's Speech Videos ─── */
function Speeches() {
  const { ref, visible } = useReveal();
  const videos = [1, 2, 3, 4];
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="absolute inset-0 bg-cross-pattern-dark" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-px">
        <div
          className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(217,165,43,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Watch & Listen" title="Doctor's Speech" dark />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v, i) => (
            <a
              key={v}
              href="https://www.youtube.com/@DrDebasisChakravarty"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group relative block overflow-hidden rounded-3xl shadow-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-gold-500/20 hover:shadow-2xl",
                visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <img
                src={v % 2 === 0 ? "/images/doctor-clinic.jpg" : "/images/doctor-desk.jpg"}
                alt={`Doctor's Speech ${v}`}
                className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-ink/40 transition-all duration-300 group-hover:bg-ink/55">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 shadow-2xl shadow-gold-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-gold-400/70">
                  <Play className="h-7 w-7 fill-current text-ink" />
                </div>
              </div>
              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/95 via-ink/60 to-transparent p-5 pt-12">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                  YouTube
                </p>
                <p className="mt-1 text-sm font-bold text-white">Doctor's Speech {v}</p>
              </div>
              {/* Gold corner */}
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/20 backdrop-blur-sm ring-1 ring-gold-500/30">
                <svg className="h-4 w-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Blog Preview ─── */
function BlogPreview() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />

      <div className="relative mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Health Articles" title="Blog" />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {BLOG_POSTS.map((b, i) => (
            <Link
              key={b.slug}
              to="/blog"
              className={cn(
                "group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-zinc-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold-200",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="p-7">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                  {b.date}
                </p>
                <h3 className="mt-3 text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold-600">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{b.excerpt}</p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gold-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Read more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-2xl bg-ink px-9 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-300 hover:bg-gold-500 hover:text-ink hover:-translate-y-1 hover:shadow-gold-500/30 hover:shadow-2xl"
          >
            View All Blogs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  const { ref, visible } = useReveal();
  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center mb-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold-900/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-400 ring-1 ring-gold-500/30">
          State of the art
        </span>
        <h2 className="mt-4 text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Futuristic Orthopaedic Technology
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Experience premium medical technology, from robotic joint replacements to AI-driven movement recovery and diagnostics.
        </p>
      </div>
      <div
        className={cn(
          "transition-all duration-1000",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <SmoothCarousel3D />
      </div>
    </section>
  );
}

/* ─── Main Home export ─── */
export default function Home() {
  return (
    <>
      <Hero3D />
      <Technology />
      <div id="book" className="scroll-mt-20">
        <Intro />
      </div>
      <Treatments />
      <Publications />
      <WhyBand />
      <Testimonials />
      <Speeches />
      <BlogPreview />
    </>
  );
}
