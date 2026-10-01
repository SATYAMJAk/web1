import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { DOCTOR, STATS } from "@/data/content";
import { Link } from "react-router";
import { ArrowRight, Award, GraduationCap, Hospital, Stethoscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MILESTONES = [
  {
    icon: GraduationCap,
    title: "Medical Education",
    text: "MBBS followed by M.S. in Orthopaedics — the foundation of a career devoted to bones, joints and the people they carry.",
  },
  {
    icon: Award,
    title: "UK Fellowships",
    text: "MRCS (Edinburgh) and FRCS in Trauma & Orthopaedics, with years of specialist training and practice across leading hospitals in the United Kingdom.",
  },
  {
    icon: Hospital,
    title: "Leadership at Manipal",
    text: "Director of the Department of Orthopaedics and Senior Consultant for Joint Replacement & Trauma Surgery at Manipal Hospitals, Kolkata.",
  },
  {
    icon: Stethoscope,
    title: "Academic Contribution",
    text: "Author and presenter of research at regional, national and international orthopaedic meetings, with publications in peer-reviewed journals.",
  },
];

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
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

export default function About() {
  return (
    <>
      <PageHero
        title="About Doctor"
        crumb="About Doctor"
        subtitle="Meet the surgeon who has dedicated over three decades to transforming lives through orthopaedic excellence."
      />

      {/* Main bio section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-14 px-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Image column */}
          <div className="relative">
            {/* Outer ring decorations */}
            <div className="absolute -inset-3 rounded-[2.5rem] border border-gold-200" />
            <div className="absolute -inset-6 rounded-[3rem] border border-gold-100" />

            <img
              src="/images/doctor-standing.webp"
              alt={DOCTOR.name}
              className="relative w-full rounded-[2rem] object-cover shadow-2xl"
            />

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 px-7 py-5 text-ink shadow-2xl shadow-gold-500/30 sm:block">
              <p className="text-4xl font-extrabold leading-none">32+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider">Years of Experience</p>
            </div>

            {/* FRCS badge */}
            <div className="glass-dark absolute -left-4 top-8 hidden rounded-2xl px-4 py-3 sm:block">
              <p className="text-xs font-semibold text-gold-400">FRCS (Tr & Orth)</p>
              <p className="text-[11px] text-white/50">Edinburgh Trained</p>
            </div>
          </div>

          {/* Text column */}
          <div>
            <SectionHeading align="left" eyebrow="The Full Story" title={DOCTOR.name} />
            <p className="mt-4 text-base font-bold text-gold-600">{DOCTOR.degrees}</p>
            <ul className="mt-3 space-y-2">
              {DOCTOR.roles.map((r) => (
                <li key={r} className="flex items-center gap-3 text-sm font-medium text-zinc-700">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-4 leading-relaxed text-zinc-600">
              <p>
                Dr. Debasis Chakravarty is a senior orthopaedic and joint replacement surgeon with
                more than 30 years of experience. He specialises in replacement of the hip, knee,
                elbow and shoulder, in revision surgery for failed joint replacements, and in
                treating fractures and dislocations of every kind.
              </p>
              <p>
                After completing his specialist training, he spent formative years in the United
                Kingdom, earning his MRCS from Edinburgh and the FRCS in Trauma & Orthopaedics.
                He returned to India to bring that world-class expertise to patients at home.
              </p>
              <p>
                Today he leads the Department of Orthopaedics at Manipal Hospitals, Kolkata, where
                he has performed thousands of successful joint replacements and trauma procedures.
                He is a member of the Medical Council of India (MCI).
              </p>
              <p>
                Patients know him for the same qualities his colleagues do: meticulous surgical
                planning, honest counsel, and the patience to listen to every concern before a single
                decision is made.
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-ink shadow-xl shadow-gold-500/20 transition-all duration-300 hover:bg-gold-400 hover:-translate-y-1"
              >
                Book an Appointment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones & Stats */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="A Career in Orthopaedics" title="Milestones & Credentials" />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <div
                key={m.title}
                className="group rounded-3xl bg-white p-7 shadow-lg ring-1 ring-zinc-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold-200"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-400/30 transition-transform duration-300 group-hover:scale-110">
                  <m.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-base font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-16 overflow-hidden rounded-3xl bg-ink">
            <div className="relative grid gap-px bg-gold-500/10 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 bg-ink py-12 text-center">
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
        </div>
      </section>
    </>
  );
}
