import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { PUBLICATIONS } from "@/data/content";
import { BookOpen, Presentation, ExternalLink } from "lucide-react";

export default function Publications() {
  return (
    <>
      <PageHero
        title="Presentations & Publications"
        crumb="Presentation & Publication"
        subtitle="Research published and presented at orthopaedic meetings and journals worldwide."
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4">
          <SectionHeading
            eyebrow="Regional, National & International"
            title="Presentations & Publications"
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-zinc-600">
            A selection of research presented and published at orthopaedic meetings and journals in
            India and abroad.
          </p>

          <div className="mt-14 space-y-5">
            {PUBLICATIONS.map((p, i) => (
              <article
                key={i}
                className="group flex gap-5 rounded-3xl border border-zinc-100 bg-white p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-2xl"
              >
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg shadow-gold-400/30 transition-transform duration-300 group-hover:scale-110">
                  {i % 2 === 0 ? (
                    <BookOpen className="h-6 w-6" />
                  ) : (
                    <Presentation className="h-6 w-6" />
                  )}
                </span>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-gold-600">{p.authors}</h3>
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-50 text-zinc-300 transition-colors group-hover:bg-gold-50 group-hover:text-gold-500">
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{p.detail}</p>
                  {/* Type badge */}
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    {i % 2 === 0 ? "Publication" : "Presentation"}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
