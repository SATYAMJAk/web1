import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { BLOG_POSTS } from "@/data/content";
import { CalendarDays, ArrowRight, Clock } from "lucide-react";

export default function Blog() {
  return (
    <>
      <PageHero
        title="Blog"
        crumb="Blog"
        subtitle="Practical guidance on joint health, replacement surgery and recovery."
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />
        <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Health Articles" title="From the Doctor's Desk" />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
            Practical guidance on joint health, replacement surgery and recovery — written for
            patients and families.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((b, i) => (
              <article
                key={b.slug}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-zinc-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold-200"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  {/* Category pill */}
                  <div className="absolute left-4 top-4 rounded-full bg-gold-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink backdrop-blur-sm">
                    Orthopaedics
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-gold-500" /> {b.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-gold-500" /> 5 min read
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold leading-snug text-ink transition-colors group-hover:text-gold-600">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{b.excerpt}</p>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-gold-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Bottom accent line */}
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
