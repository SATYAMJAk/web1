import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { TREATMENTS } from "@/data/content";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Treatments() {
  return (
    <>
      <PageHero
        title="Treatments"
        crumb="Treatments"
        subtitle="World-class orthopaedic care — from first consultation to full recovery."
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-zinc-50" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading
            eyebrow="Best Orthopaedic, Joint Replacement & Trauma Care!"
            title="Services & Treatments"
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
            From first consultation to full recovery — specialist care for every major joint, plus
            revision surgery and trauma care.
          </p>

          <div className="mt-16 space-y-20">
            {TREATMENTS.map((t, idx) => (
              <article
                key={t.slug}
                id={t.slug}
                className={cn(
                  "grid scroll-mt-28 items-center gap-10 lg:grid-cols-2",
                  idx % 2 === 1 && "lg:[&>*:first-child]:order-2"
                )}
              >
                {/* Image */}
                <div className="relative group">
                  <div className={cn(
                    "absolute -inset-2 rounded-[2.5rem] border border-gold-200 opacity-0 transition-opacity group-hover:opacity-100"
                  )} />
                  <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105 lg:h-80"
                    />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -bottom-5 -right-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-xl shadow-gold-400/30 text-xl font-extrabold text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold-700">
                    Treatment #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
                    {t.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-zinc-600">{t.short}</p>

                  <ul className="mt-6 space-y-3">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-zinc-700">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/#book"
                    className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-ink shadow-xl shadow-gold-500/20 transition-all duration-300 hover:bg-gold-400 hover:-translate-y-1"
                  >
                    Book Consultation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
