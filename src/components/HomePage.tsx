import { Heart, Users, Clock, Shield, ArrowRight, Phone, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { Reveal } from "./Reveal";
import { site } from "../siteConfig";

interface HomePageProps {
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function HomePage({ onNavigateToServices, onNavigateToContact }: HomePageProps) {
  const fullText = site.slogan;
  const [displayedText, setDisplayedText] = useState(() => (prefersReducedMotion() ? fullText : ""));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let currentIndex = 0;
    let typingInterval: ReturnType<typeof setInterval> | undefined;
    // Wait for the logo animation, then type the slogan
    const start = setTimeout(() => {
      typingInterval = setInterval(() => {
        currentIndex++;
        setDisplayedText(fullText.slice(0, currentIndex));
        if (currentIndex >= fullText.length) clearInterval(typingInterval);
      }, 60);
    }, 1100);
    return () => {
      clearTimeout(start);
      clearInterval(typingInterval);
    };
  }, [fullText]);

  const services = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Two free one-hour grief counselling sessions for bereaved family members.",
    },
    {
      icon: Users,
      title: "Family Support",
      description: "Our dedicated team supports families through every step of the funeral planning process.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "We are available around the clock to assist you during your time of need.",
    },
    {
      icon: Shield,
      title: "Trusted Service",
      description: "Committed to professional, reliable funeral services delivered with dignity.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero – video background with animated logo and slogan */}
      <section className="relative h-[88svh] min-h-[560px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0" aria-hidden>
          <iframe
            title="Mbusi Ndala Funeral Parlour background video"
            src="https://www.youtube.com/embed/mYNLyFqllWE?autoplay=1&mute=1&loop=1&playlist=mYNLyFqllWE&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1"
            allow="autoplay; fullscreen"
            tabIndex={-1}
            className="absolute left-1/2 top-1/2 pointer-events-none border-0 opacity-30 blur-[6px]"
            style={{
              /* always cover the full hero (no black side bars), with extra bleed for the blur */
              width: "max(115vw, calc(max(88svh, 560px) * 1.15 * 16 / 9))",
              height: "max(calc(max(88svh, 560px) * 1.15), calc(115vw * 9 / 16))",
              transform: "translate(-50%, -50%)",
            }}
          />
          {/* darken the edges so the logo and slogan stay the focus */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.85)_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
        </div>

        <div className="relative z-10 text-center px-6 pt-16">
          <div className="relative inline-block">
            <div aria-hidden className="absolute inset-0 -m-10 rounded-full bg-white/10 blur-3xl animate-glow" />
            <img
              src={logo}
              alt={site.name}
              width={340}
              height={193}
              className="relative w-[240px] sm:w-[320px] md:w-[420px] h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.25)] animate-logo-in"
            />
          </div>

          <h1 className="mt-10 text-white text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-tight max-w-3xl mx-auto min-h-[2.5em] md:min-h-[2.4em]">
            <span className="sr-only">{fullText}</span>
            <span aria-hidden>
              {displayedText}
              <span className="inline-block w-[2px] h-[0.9em] -mb-[0.1em] ml-1 bg-white/80 animate-pulse" />
            </span>
          </h1>

          <div className="mt-8 flex gap-3 justify-center flex-wrap animate-fade-up [animation-delay:1.4s]">
            <button
              onClick={onNavigateToServices}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all"
            >
              Our Services
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={`tel:${site.phoneLink}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/40 text-white font-medium backdrop-blur-sm hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              Call 24/7
            </a>
          </div>
        </div>

        <ChevronDown aria-hidden className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-6 text-white/60 animate-bounce" />
      </section>

      {/* Welcome Section */}
      <section className="py-24 md:py-32 px-4 bg-white dark:bg-black transition-colors duration-300">
        <Reveal className="container mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/50 mb-6">
            Funeral Services · Kwa-Thema, Springs
          </p>
          <h2 className="text-black dark:text-white text-3xl md:text-5xl font-serif font-medium leading-tight mb-8">
            A dignified farewell, with care that goes beyond the day itself.
          </h2>
          <p className="text-gray-600 dark:text-white/75 text-lg leading-relaxed">
            At Mbusi Ndala, we understand that losing a loved one is one of life's most difficult experiences. Our
            mission is to provide families with the support, guidance, and compassionate care they need during this
            challenging time.
          </p>
        </Reveal>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-white/[0.03] transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-black dark:text-white text-center mb-14 text-4xl md:text-5xl font-serif font-medium">
              What We Offer
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 100}>
                <article className="group h-full rounded-3xl bg-white dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/10 p-5 md:p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:hover:bg-white/[0.07]">
                  <div className="mx-auto mb-5 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <service.icon className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-black dark:text-white mb-3 text-base md:text-xl font-medium">{service.title}</h3>
                  <p className="text-gray-600 dark:text-white/65 text-xs md:text-[15px] leading-relaxed">
                    {service.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <Reveal className="container mx-auto max-w-5xl">
          <div className="rounded-[2rem] bg-black dark:bg-white text-white dark:text-black px-8 py-14 md:p-20 text-center relative overflow-hidden">
            <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 dark:bg-black/5 blur-2xl" />
            <h2 className="relative mb-5 text-3xl md:text-5xl font-serif font-medium">We're Here to Help</h2>
            <p className="relative text-white/75 dark:text-black/70 text-lg mb-10 max-w-xl mx-auto">
              Our compassionate team is available 24/7 to assist you. Please don't hesitate to reach out.
            </p>
            <div className="relative flex gap-3 justify-center flex-wrap">
              <button
                onClick={onNavigateToContact}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black dark:bg-black dark:text-white font-medium hover:opacity-90 transition-all"
              >
                Contact Us Today
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`tel:${site.phoneLink}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 dark:border-black/20 font-medium hover:bg-white/10 dark:hover:bg-black/5 transition-all"
              >
                <Phone className="w-4 h-4" />
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}