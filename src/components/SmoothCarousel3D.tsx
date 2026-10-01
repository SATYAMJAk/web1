import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const IMAGES = [
  "/images/tech-1.jpg",
  "/images/tech-2.jpg",
  "/images/tech-3.jpg",
  "/images/tech-1.jpg", // Duplicate to make a ring of 6
  "/images/tech-2.jpg",
  "/images/tech-3.jpg",
];

export default function SmoothCarousel3D({
  images = IMAGES,
  className,
}: {
  images?: string[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationId: number;
    let angle = 0;

    const animate = () => {
      angle -= 0.15; // Speed of rotation
      if (containerRef.current) {
        containerRef.current.style.transform = `translateZ(-300px) rotateY(${angle}deg)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      className={cn(
        "relative mx-auto flex h-[500px] w-full max-w-4xl items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className="relative h-72 w-56 sm:h-80 sm:w-64"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          className="absolute inset-0 h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((src, i) => {
            const itemAngle = (360 / images.length) * i;
            return (
              <div
                key={i}
                className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl border border-gold-500/30 bg-ink shadow-2xl shadow-gold-500/20"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(320px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 z-20 shadow-[inset_0_0_20px_rgba(217,165,43,0.3)] pointer-events-none" />
                <img
                  src={src}
                  alt={`Futuristic Tech ${i + 1}`}
                  className="h-full w-full object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
