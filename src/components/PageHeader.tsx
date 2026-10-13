import type { ReactNode } from "react";

/**
 * Page title used at the top of inner pages.
 * Pass an `image` to show a photo banner behind the title (same style as the Contact page).
 * Without an image it falls back to a clean, text-only header.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  imagePosition = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  /** CSS object-position, e.g. "center", "top", "center 30%" – to choose which part of the photo shows */
  imagePosition?: string;
}) {
  if (image) {
    return (
      <section className="relative h-[460px] md:h-[520px] flex items-end justify-center overflow-hidden bg-black">
        <img
          src={image}
          alt={imageAlt}
          fetchPriority="high"
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-slow-zoom"
          style={{ objectPosition: imagePosition }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="relative z-10 text-center px-4 pb-16 md:pb-20 max-w-3xl animate-fade-up">
          {eyebrow && (
            <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/60 mb-5">{eyebrow}</p>
          )}
          <h1 className="text-white text-5xl md:text-7xl font-serif font-medium tracking-tight mb-5">{title}</h1>
          {subtitle && <p className="text-white/80 text-lg md:text-xl font-light leading-relaxed">{subtitle}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-36 md:pt-44 pb-12 md:pb-16 px-4 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[900px] max-w-[140vw] h-[420px] rounded-full bg-gradient-to-b from-gray-100 to-transparent dark:from-white/[0.06] blur-2xl"
      />
      <div className="relative text-center max-w-3xl mx-auto animate-fade-up">
        {eyebrow && (
          <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/50 mb-5">
            {eyebrow}
          </p>
        )}
        <h1 className="text-black dark:text-white text-5xl md:text-7xl font-serif font-medium tracking-tight">
          {title}
        </h1>
        <div className="mx-auto mt-6 h-px w-16 bg-black/20 dark:bg-white/25" />
        {subtitle && (
          <p className="text-gray-600 dark:text-white/70 mt-6 text-lg md:text-xl font-light leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
