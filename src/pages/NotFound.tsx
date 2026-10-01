import { Link } from "react-router";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-ink py-20 text-center">
      {/* Background */}
      <div className="absolute inset-0 bg-cross-pattern-dark" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,165,43,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 px-4">
        <p className="text-[120px] font-extrabold leading-none text-gradient-gold sm:text-[180px]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-white/50">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink shadow-xl transition-all hover:bg-gold-400 hover:-translate-y-1"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all hover:border-gold-500 hover:text-gold-400 hover:-translate-y-1"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </button>
        </div>
      </div>
    </section>
  );
}
