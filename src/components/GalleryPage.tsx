import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import galleryImage1 from "figma:asset/06cf0dc390caf4df8439d2ef81c7cc4b12da9e88.png";
import galleryImage2 from "figma:asset/20c1db3fafa27fdd80b3848a2b6055166b4eb41e.png";
import galleryImage3 from "figma:asset/148040122327d3c22ac900264ae81fcfc043c784.png";

/* =====================================================================
   📸 PASTE YOUR GALLERY IMAGE LINKS HERE
   ---------------------------------------------------------------------
   • Replace each "PASTE_LINK_HERE" with an image URL (keep the quotes).
   • Change the title/description to suit each photo – the title shows
     on hover and both show when the photo is opened full screen.
   • Slots still saying "PASTE_LINK_HERE" are skipped automatically.
   • Need more? Copy a whole { ... }, block and paste it into the list.
   ===================================================================== */
const allGalleryImages = [
  {
    src: galleryImage1,
    title: "Compassionate Service",
    description: "Supporting families through every moment with dignity and care.",
  },
  {
    src: galleryImage2,
    title: "Professional Facilities",
    description: "Elegant and comfortable spaces for memorial services.",
  },
  {
    src: galleryImage3,
    title: "Community Focused",
    description: "Dedicated team members providing comprehensive support.",
  },
  {
    src: "https://myimgs.org/storage/images/55436/image-1000x10004.png",
    title: "Gathering in Fellowship",
    description: "Creating a warm, welcoming space for families and loved ones to come together.",
  },
  {
    src: "https://myimgs.org/storage/images/55441/image-1000x10006.png",
    title: "Graveside Arrangements",
    description: "Thoughtfully prepared graveside settings, from carpeting to floral tributes.",
  },
  {
    src: "https://myimgs.org/storage/images/55432/CasketHolding.jpg",
    title: "A Dignified Procession",
    description: "Every journey is handled with the utmost respect, care and reverence.",
  },
  {
    src: "https://myimgs.org/storage/images/55433/teamonsite.jpg",
    title: "Our Dedicated Team",
    description: "A professional team standing alongside families from start to finish.",
  },
  {
    src: "https://myimgs.org/storage/images/55434/benzs.jpg",
    title: "Our Fleet",
    description: "Well-maintained, elegant vehicles for a graceful and dignified farewell.",
  },
  {
    src: "https://myimgs.org/storage/images/55435/umbrella.jpg",
    title: "Attention to Detail",
    description: "Every element of the service is carefully considered and beautifully presented.",
  },
];
/* ===================================================================== */

export function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleryImages = allGalleryImages.filter((img) => img.src && img.src !== "PASTE_LINK_HERE");

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Keyboard: Esc closes, arrow keys move between photos
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") setSelectedImageIndex((i) => (i === null ? i : (i + 1) % galleryImages.length));
      if (e.key === "ArrowLeft")
        setSelectedImageIndex((i) => (i === null ? i : (i - 1 + galleryImages.length) % galleryImages.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedImageIndex, galleryImages.length]);

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Our Work"
        title="Gallery"
        subtitle="Dignified facilities & compassionate service"
      />

      {/* Gallery Grid */}
      <section className="pt-4 pb-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {galleryImages.map((image, index) => (
              <Reveal key={index} delay={(index % 3) * 100}>
                <button
                  type="button"
                  aria-label={`Open photo: ${image.title}`}
                  className="group relative block w-full overflow-hidden rounded-2xl md:rounded-3xl aspect-square bg-gray-100 dark:bg-white/5 cursor-zoom-in shadow-sm hover:shadow-2xl transition-all duration-500"
                  onClick={() => openLightbox(index)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={`${image.title} – ${image.description}`}
                    loading={index < 3 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 text-left translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-sm md:text-lg font-serif">{image.title}</p>
                  </div>
                  <span className="absolute top-3 right-3 md:top-4 md:right-4 w-9 h-9 rounded-full bg-white/85 text-black flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryImages[selectedImageIndex].title}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            aria-label="Close"
            className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            aria-label="Previous photo"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            onClick={prevImage}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <figure className="max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              key={selectedImageIndex}
              src={galleryImages[selectedImageIndex].src}
              alt={galleryImages[selectedImageIndex].title}
              className="max-w-full max-h-[72vh] object-contain rounded-2xl animate-in fade-in zoom-in-95 duration-300"
            />
            <figcaption className="mt-6 text-center max-w-xl px-4">
              <h3 className="text-white text-2xl font-serif mb-1">{galleryImages[selectedImageIndex].title}</h3>
              <p className="text-white/65 text-sm">{galleryImages[selectedImageIndex].description}</p>
              <p className="text-white/40 text-xs tracking-widest mt-4">
                {selectedImageIndex + 1} / {galleryImages.length}
              </p>
            </figcaption>
          </figure>

          <button
            aria-label="Next photo"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
            onClick={nextImage}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
