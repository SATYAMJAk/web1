import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CASE_STUDIES } from "@/data/content";
import { ArrowRight } from "lucide-react";

export default function CaseStudies() {
  return (
    <>
      <PageHero
        title="Case Studies"
        crumb="Case Studies"
        subtitle="Real patients, real outcomes — de-identified stories of transformation."
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />

        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Real Patients, Real Outcomes" title="Case Studies" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
            De-identified examples of the conditions treated every week — and the remarkable
            recoveries that follow.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {CASE_STUDIES.map((c, i) => (
              <article
                key={c.title}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-zinc-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold-200"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />

                  {/* Category badge on image */}
                  <div className="absolute left-5 top-5 rounded-2xl border border-gold-400/30 bg-gold-500/90 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink backdrop-blur-sm">
                    {c.category}
                  </div>

                  {/* Title overlay on hover */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-lg font-extrabold leading-snug text-white">{c.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-sm leading-relaxed text-zinc-600">{c.summary}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gold-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    View Details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500 group-hover:w-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
