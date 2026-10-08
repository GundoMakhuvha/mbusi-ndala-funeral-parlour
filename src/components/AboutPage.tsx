import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { Award, Heart, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";

/* =====================================================================
   📸 PASTE YOUR IMAGE LINKS HERE
   ---------------------------------------------------------------------
   • Replace each "PASTE_LINK_HERE" with an image URL (keep the quotes).
   • Any slot still saying "PASTE_LINK_HERE" is skipped automatically,
     so you can fill in as many or as few as you like.
   • Need more slots? Copy a line and add it to the list.
   ===================================================================== */

// 1) "Our Story" slideshow – rotates every 5 seconds next to the story text
const storyImages = [
  { src: "https://myimgs.org/storage/images/55418/image-1000x10001.png", alt: "Funeral home interior" },
  { src: "https://myimgs.org/storage/images/55406/givingback.jpg", alt: "Giving Back" },
  { src: "https://myimgs.org/storage/images/55420/image-1000x10002.png", alt: "Giving Back" },
  { src: "https://distant-cyan-nhhwtwq6dn.edgeone.app/About%20image%20.jpg", alt: "the team" },
];

// 2) "In Our Community" slideshow – shown below the Director section
//    (outreach programmes, eye-testing events, family services, etc.)
const communityImages = [
  { src: "PASTE_LINK_HERE", alt: "Community outreach" },
  { src: "PASTE_LINK_HERE", alt: "Community outreach" },
  { src: "PASTE_LINK_HERE", alt: "Community outreach" },
  { src: "PASTE_LINK_HERE", alt: "Community outreach" },
  { src: "PASTE_LINK_HERE", alt: "Community outreach" },
  { src: "PASTE_LINK_HERE", alt: "Community outreach" },
];

/* ===================================================================== */

const isFilled = (img: { src: string }) => img.src.startsWith("http");

type Slide = { src: string; alt: string };

function Slideshow({ images, heightClass, interval = 5000 }: { images: Slide[]; heightClass: string; interval?: number }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touchX, setTouchX] = useState<number | null>(null);
  const count = images.length;

  const go = (dir: number) => setCurrent((i) => (i + dir + count) % count);

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = setInterval(() => setCurrent((i) => (i + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, paused, interval]);

  if (count === 0) return null;

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div
        className={`relative ${heightClass} rounded-3xl overflow-hidden shadow-2xl group bg-gray-100 dark:bg-white/5`}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX === null) return;
          const dx = e.changedTouches[0].clientX - touchX;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          setTouchX(null);
        }}
      >
        {images.map((img, i) => (
          <ImageWithFallback
            key={img.src + i}
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-black backdrop-blur hover:bg-white shadow-lg transition md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-black backdrop-blur hover:bg-white shadow-lg transition md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-3 right-4 text-white text-xs tracking-widest bg-black/50 backdrop-blur px-3 py-1 rounded-full">
              {current + 1} / {count}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show image ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-black dark:bg-white" : "w-2 bg-gray-300 dark:bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function AboutPage() {
  const slides = storyImages.filter(isFilled);
  const community = communityImages.filter(isFilled);

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We treat every family with the care and respect they deserve during their most difficult moments.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in all aspects of our funeral services.",
    },
    {
      icon: Users,
      title: "Community",
      description: "We are proud to serve our community with dedication and integrity.",
    },
    {
      icon: Clock,
      title: "Availability",
      description: "Our team is available 24/7 to provide support whenever you need us.",
    },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Mbusi Ndala Funeral Parlour"
        title="About Us"
        subtitle="Compassion, dignity, excellence and integrity – a calling, not just a profession."
      />

      {/* Our Story */}
      <section className="pt-8 pb-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <Reveal>
              <h2 className="text-black dark:text-white mb-8 text-4xl md:text-5xl font-serif font-medium">Our Story</h2>
              <p className="text-gray-600 dark:text-white/80 mb-4 leading-relaxed">
                At Mbusi Ndala Funeral Parlour,
                we believe that every farewell should beautifully reflect a life well-lived.
                Founded on the principles of compassion, dignity, excellence, and integrity,
                we are dedicated to serving families with care that goes beyond the funeral itself.
              </p>
              <p className="text-gray-600 dark:text-white/80 mb-4 leading-relaxed">
                For us, this is more than a profession;
                it is a calling.
                We understand that losing a loved one is one of life's most difficult experiences,
                which is why we strive to provide comfort, guidance,
                and peace of mind throughout every step of the journey.
              </p>
              <p className="text-gray-600 dark:text-white/80 mb-4 leading-relaxed">
                We are deeply rooted in our community because we genuinely care for the people we serve.
                Every family, every story, and every life matter to us.
                We believe in building lasting relationships founded on trust,
                compassion, and respect, ensuring that everyone who walks through our doors feels seen,
                heard, and supported.
              </p>
              <p className="text-gray-600 dark:text-white/80 mb-4 leading-relaxed">
                What makes Mbusi Ndala Funeral Parlour unique is our holistic approach to care.
                We recognise that families need emotional support just as much as practical assistance.
                Through professional grief counselling and emotional support,
                guided by the expertise of our founder,
                who holds a Master's degree in Psychology,
                we help families navigate loss with compassion, understanding, and hope.
              </p>
              <p className="text-gray-600 dark:text-white/80 leading-relaxed">
                Giving back is at the heart of who we are.
                We proudly invest in the well-being of our community through outreach programs,
                health awareness initiatives, and partnerships that uplift those around us.
                Whether providing free eye-testing events for senior citizens,
                supporting local families, or creating opportunities that improve lives,
                we believe that serving our community extends far beyond the day of the funeral.
              </p>
            </Reveal>

            {/* Story slideshow (images come from storyImages at the top of this file) */}
            <Reveal delay={150} className="lg:sticky lg:top-28">
              <Slideshow images={slides} heightClass="h-[400px] lg:h-[560px]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-white/[0.03] transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-black dark:text-white text-center mb-14 text-4xl md:text-5xl font-serif font-medium">
              Our Values
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 100}>
                <article className="group h-full rounded-3xl bg-white dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/10 p-5 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-5 w-12 h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-black dark:text-white mb-2 text-lg md:text-xl font-medium">{value.title}</h3>
                  <p className="text-gray-600 dark:text-white/65 text-sm md:text-[15px] leading-relaxed">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="py-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-black dark:text-white text-center mb-14 text-4xl md:text-5xl font-serif font-medium">The Director</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <Reveal className="relative h-[520px] md:h-[600px] rounded-3xl overflow-hidden group shadow-2xl">
                <ImageWithFallback
                  src="https://boiling-gray-ontmdfzvkt.edgeone.app/WhatsApp%20Image%202026-01-22%20at%2016.44.57%20(1).jpeg"
                  alt="Director Ephie Lebohang Ndala"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                   <h3 className="text-3xl font-serif font-medium">Ephie Lebohang Ndala</h3>
                   <p className="text-white/80">Director</p>
                </div>
             </Reveal>
             <Reveal delay={150}>
                <p className="text-black dark:text-white text-2xl md:text-3xl font-serif leading-snug mb-8 italic">
                  "At Mbusi Ndala Funeral Parlour, we believe that every person's life deserves a dignified and respectful farewell. My vision for this parlour was born out of a deep desire to help families navigate their darkest hours with grace and support."
                </p>
                <p className="text-gray-600 dark:text-white/80 text-lg leading-relaxed mb-6">
                  Mbusi Ndala started this parlour with a commitment to transparency, empathy, and excellence. Under his leadership, the parlour has grown into a cornerstone of the community, known for its unwavering support for families across generations.
                </p>

             </Reveal>
          </div>
        </div>
      </section>

      {/* In Our Community – slideshow (images come from communityImages at the top of this file).
          Hidden automatically until at least one link is pasted in. */}
      {community.length > 0 && (
        <section className="py-24 px-4 bg-gray-50 dark:bg-white/[0.03] transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-black dark:text-white text-center mb-4 text-4xl md:text-5xl font-serif font-medium">In Our Community</h2>
            <p className="text-gray-600 dark:text-white/80 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              Outreach programmes, health awareness initiatives and moments with the families we serve.
            </p>
            <Slideshow images={community} heightClass="h-[300px] md:h-[550px]" interval={4000} />
          </div>
        </section>
      )}

      {/* Mission Statement */}
      <section className="py-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <Reveal className="container mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-white/50 mb-6">Our Mission</p>
          <h2 className="sr-only">Our Mission</h2>
          <p className="text-black dark:text-white text-2xl md:text-4xl leading-snug font-serif">
            To honour the memory of those who have passed by providing exceptional funeral services that bring
            comfort to families, celebrate lives lived, and create meaningful moments of remembrance. We are
            dedicated to serving our community with compassion, integrity, and professionalism in every aspect
            of our care.
          </p>
        </Reveal>
      </section>
    </div>
  );
}