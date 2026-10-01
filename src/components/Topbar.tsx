import { Clock, Facebook, Instagram, Linkedin, Mail, Phone, Twitter, Youtube } from "lucide-react";
import { EMAIL, HOURS_TOP, PHONE, PHONE_HREF, SOCIALS } from "@/data/content";

const ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Topbar() {
  return (
    <div className="bg-gold-600 text-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-2 text-xs font-semibold sm:text-[13px]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
          >
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
          <span className="hidden items-center gap-1.5 md:flex">
            <Clock className="h-3.5 w-3.5" /> {HOURS_TOP}
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="hidden items-center gap-1.5 transition-opacity hover:opacity-70 sm:flex"
          >
            <Mail className="h-3.5 w-3.5" /> {EMAIL}
          </a>
        </div>

        <div className="flex items-center gap-1">
          {SOCIALS.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-ink/80 transition-all hover:bg-ink hover:text-gold-400"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
