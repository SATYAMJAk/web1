import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { SEMINARS } from "@/data/content";
import { GraduationCap, Globe } from "lucide-react";

export default function Seminars() {
  return (
    <>
      <PageHero
        title="Courses & Seminars"
        crumb="Courses & Seminars"
        subtitle="Over 130 conferences and seminars attended across four continents."
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <SectionHeading eyebrow="Always Learning, Always Teaching" title="Courses & Seminars" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
            Over 130 conferences, courses and seminars attended across four continents — a selection
            of representative meetings.
          </p>

          {/* Counter strip */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { value: "130+", label: "Seminars Attended" },
              { value: "4", label: "Continents" },
              { value: "32+", label: "Years Presenting" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-gradient-to-br from-gold-500 to-gold-600 p-6 text-center shadow-xl shadow-gold-400/20"
              >
                <p className="text-4xl font-extrabold text-ink">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink/70">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {SEMINARS.map((s, i) => (
              <div
                key={s.title}
                className="group flex items-start gap-5 rounded-3xl border border-zinc-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-2xl"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ink to-zinc-800 text-gold-400 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:from-gold-500 group-hover:to-gold-600 group-hover:text-ink">
                  <GraduationCap className="h-7 w-7" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                    <Globe className="h-4 w-4 text-gold-500" />
                    {s.place}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
