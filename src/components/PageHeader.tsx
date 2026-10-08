import type { ReactNode } from "react";

/** Clean, image-free page title used at the top of inner pages. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative pt-36 md:pt-44 pb-12 md:pb-16 px-4 bg-white dark:bg-black transition-colors duration-300 overflow-hidden">
      {/* soft radial glow */}
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
