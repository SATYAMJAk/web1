import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  dark = false,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left")}>
      {/* Eyebrow */}
      <p
        className={cn(
          "font-script text-2xl sm:text-3xl",
          dark ? "text-gold-400" : "text-gold-500"
        )}
      >
        {eyebrow}
      </p>

      {/* Title */}
      <h2
        className={cn(
          "mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>

      {/* Decorative line */}
      <div
        className={cn(
          "mt-5 h-0.5 w-20 bg-gradient-to-r from-gold-400 to-gold-600",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
