import { useState } from "react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { GALLERY_IMAGES } from "@/data/content";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const prev = () => setActive((a) => (a !== null ? (a - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const next = () => setActive((a) => (a !== null ? (a + 1) % GALLERY_IMAGES.length : null));

  return (
    <>
      <PageHero
        title="Gallery"
        crumb="Gallery"
        subtitle="A visual journey through surgeries, consultations, and milestones."
      />

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />

        <div className="relative mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Moments & Milestones" title="Photo Gallery" />

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            {GALLERY_IMAGES.map((g, i) => (
              <button
                key={g.src}
                id={`gallery-item-${i}`}
                onClick={() => setActive(i)}
                className="group relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-zinc-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:ring-gold-200"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-110"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn className="h-8 w-8 text-white/90" />
                  <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/80">
                    View
                  </span>
                </div>
                {/* Caption bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 pt-10 text-left text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {g.caption}
                </div>
                {/* Gold corner badge */}
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-gold-500/0 transition-all duration-300 group-hover:bg-gold-500/90">
                  <ZoomIn className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close button */}
          <button
            aria-label="Close"
            className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-sm transition hover:bg-gold-500 hover:text-ink"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev/Next */}
          <button
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-sm transition hover:bg-gold-500 hover:text-ink"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-sm transition hover:bg-gold-500 hover:text-ink"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <figure className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-2 ring-gold-500/30">
              <img
                src={GALLERY_IMAGES[active].src}
                alt={GALLERY_IMAGES[active].caption}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm font-semibold text-white/70">
              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-gold-400">
                {GALLERY_IMAGES[active].caption}
              </span>
            </figcaption>
            <p className="mt-3 text-center text-xs text-white/30">
              {active + 1} / {GALLERY_IMAGES.length}
            </p>
          </figure>
        </div>
      )}
    </>
  );
}
