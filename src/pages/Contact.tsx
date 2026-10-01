import { useState } from "react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { CLINICS, EMAIL, HOURS_TOP, PHONE, PHONE_HREF } from "@/data/content";
import { trpc } from "@/providers/trpc";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, Phone, User, MessageSquare } from "lucide-react";

const inputCls =
  "h-12 w-full rounded-xl border border-zinc-200 bg-white/80 px-4 text-sm text-ink outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-200";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = trpc.contact.send.useMutation({
    onSuccess: () => {
      setDone(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    },
    onError: (e: any) => setError(e.message || "Something went wrong. Please try again."),
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  if (done) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-gold-200 bg-white p-10 text-center shadow-2xl shadow-gold-200/30">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-xl shadow-gold-400/40">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-ink">Message Sent!</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600">
          Thank you for reaching out. Our clinic team will get back to you soon.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-7 rounded-2xl bg-gold-500 px-8 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-lg transition-all hover:bg-gold-400 hover:-translate-y-0.5"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        mutation.mutate({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        });
      }}
      className="relative overflow-hidden rounded-3xl border border-gold-200/50 bg-white p-7 shadow-2xl shadow-gold-100/30 sm:p-9"
    >
      {/* Gold top bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />

      <h3 className="flex items-center gap-2.5 text-xl font-extrabold text-ink">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-white shadow-lg">
          <MessageSquare className="h-4 w-4" />
        </span>
        Send a Message
      </h3>
      <p className="mt-1 text-sm text-zinc-500">We'll respond within 24 hours</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-500" />
          <input
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Your Name *"
            className={inputCls + " pl-11"}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-500" />
          <input
            required
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="Email Address *"
            className={inputCls + " pl-11"}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-500" />
          <input
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="Phone Number"
            className={inputCls + " pl-11"}
          />
        </div>
        <input
          value={form.subject}
          onChange={set("subject")}
          placeholder="Subject"
          className={inputCls}
        />
      </div>
      <textarea
        required
        value={form.message}
        onChange={set("message")}
        placeholder="Your message..."
        rows={5}
        className="mt-4 w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-zinc-400 focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-200"
      />

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="group relative mt-5 flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 px-10 py-4 text-sm font-extrabold uppercase tracking-widest text-ink shadow-xl shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-500/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Send Message
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    </form>
  );
}

export default function Contact() {
  const contactCards = [
    {
      icon: Phone,
      label: "Call Us",
      value: PHONE,
      href: PHONE_HREF,
      color: "from-gold-400 to-gold-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: HOURS_TOP,
      href: undefined,
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  return (
    <>
      <PageHero
        title="Contact"
        crumb="Contact"
        subtitle="Reach out to schedule an appointment or ask any questions."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="We're Here to Help" title="Get in Touch" />

          {/* Quick contact cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {contactCards.map((c) => {
              const Icon = c.icon;
              const inner = (
                <div className="group flex items-center gap-4 rounded-3xl border border-zinc-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gold-200">
                  <span
                    className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-sm font-bold text-ink">{c.value}</span>
                  </span>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href}>
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            {/* Clinics */}
            <div className="space-y-5">
              <h3 className="text-xl font-extrabold text-ink">Clinic Locations</h3>
              {CLINICS.map((c) => (
                <div
                  key={c.name}
                  className="group rounded-3xl border border-zinc-100 bg-white p-6 shadow-lg transition-all duration-300 hover:border-gold-200 hover:shadow-xl"
                >
                  <p className="flex items-center gap-2 font-bold text-ink">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-100 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-white">
                      <MapPin className="h-4 w-4" />
                    </span>
                    {c.name}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-500">{c.address}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gold-500" />
                    <div>
                      <span className="font-semibold text-ink">{c.days}</span>
                      <span className="ml-2 text-zinc-500">{c.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form + Map */}
            <div className="space-y-7">
              <ContactForm />
              <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-zinc-100">
                <iframe
                  title="Manipal Hospitals Broadway, Kolkata"
                  src="https://www.google.com/maps?q=Manipal%20Hospitals%20Broadway%2C%20Kolkata&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
