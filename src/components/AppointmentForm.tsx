import { useMemo, useState, useEffect } from "react";
import { CalendarCheck, CheckCircle2, Loader2, User, Mail, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { cn } from "@/lib/utils";

function makeCaptcha() {
  const a = 2 + Math.floor(Math.random() * 7);
  const b = 1 + Math.floor(Math.random() * 8);
  return { a, b, answer: a + b };
}

const inputBase =
  "h-12 w-full rounded-xl border bg-white/80 px-4 pl-11 text-sm text-ink outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-200 border-zinc-200";

function InputWithIcon({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ElementType }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500">
        <Icon className="h-4 w-4" />
      </span>
      <input className={inputBase} {...props} />
    </div>
  );
}

export default function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState({ a: 1, b: 1, answer: 2 });
  
  useEffect(() => {
    setCaptcha(makeCaptcha());
  }, []);
  
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = trpc.appointments.book.useMutation({
    onSuccess: () => {
      setDone(true);
      setError(null);
      setName(""); setEmail(""); setPhone(""); setMessage(""); setCaptchaInput("");
      setCaptcha(makeCaptcha());
    },
    onError: (e: any) => setError(e.message || "Something went wrong. Please try again."),
  });

  const canSubmit = useMemo(
    () => name.trim() && email.trim() && captchaInput.trim(),
    [name, email, captchaInput]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setError("Security check failed — please solve the sum again.");
      setCaptcha(makeCaptcha());
      setCaptchaInput("");
      return;
    }
    mutation.mutate({ name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() });
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-gold-300 bg-white p-10 text-center shadow-2xl shadow-gold-200/40">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-xl shadow-gold-400/40">
          <CheckCircle2 className="h-10 w-10 text-white" />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-ink">Request Received!</h3>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600">
          Thank you, <strong>{name || "friend"}</strong>. Our clinic team will call you back shortly
          to confirm your appointment slot.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-7 rounded-2xl bg-gold-500 px-8 py-3 text-sm font-bold uppercase tracking-wider text-ink shadow-lg transition-all hover:bg-gold-400 hover:-translate-y-0.5"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-3xl border border-gold-300/50 bg-white p-6 shadow-2xl shadow-gold-200/30 sm:p-8"
    >
      {/* Gold top bar */}
      <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />

      {/* Corner decoration */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-100/60" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-gold-50" />

      <h3 className="relative flex items-center gap-2.5 text-xl font-extrabold uppercase tracking-wide text-ink">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg text-white">
          <CalendarCheck className="h-5 w-5" />
        </span>
        Book Appointment
      </h3>
      <p className="relative mt-1 text-sm text-zinc-500">
        Fill the form and we'll get back to you shortly.
      </p>

      <div className={cn("relative mt-6 space-y-4", compact && "space-y-3")}>
        <InputWithIcon
          icon={User}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name *"
        />
        <InputWithIcon
          icon={Mail}
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address *"
        />
        <InputWithIcon
          icon={Phone}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-3.5 text-gold-500">
            <MessageSquare className="h-4 w-4" />
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message or concern..."
            rows={compact ? 3 : 4}
            className="w-full rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 pl-11 text-sm text-ink outline-none transition-all placeholder:text-zinc-400 focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-200"
          />
        </div>

        {/* Captcha */}
        <div className="rounded-2xl border border-gold-200 bg-gold-50 p-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ShieldCheck className="h-4 w-4 text-gold-500" /> Security Check
          </label>
          <p className="mt-2 text-sm font-medium text-zinc-700">
            What is{" "}
            <span className="font-extrabold text-gold-600">{captcha.a}</span>
            {" + "}
            <span className="font-extrabold text-gold-600">{captcha.b}</span>
            {" = "}?
          </p>
          <input
            required
            inputMode="numeric"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            placeholder="Your answer"
            className="mt-2 h-10 w-full rounded-xl border border-gold-300 bg-white px-4 text-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 ring-1 ring-red-200">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || mutation.isPending}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 py-4 text-sm font-extrabold uppercase tracking-widest text-ink shadow-xl shadow-gold-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-500/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Make Appointment
          {/* Shimmer */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </form>
  );
}
