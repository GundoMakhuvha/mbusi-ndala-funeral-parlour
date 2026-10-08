import { Phone, Mail, MapPin, Clock, Send, Check, MessageCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { site } from "../siteConfig";

interface ContactPageProps {
  selectedPackage: string | null;
}

/* Header photo for this page – swap the link to change it */
const CONTACT_HEADER_IMAGE = "https://myimgs.org/storage/images/55432/CasketHolding.jpg";

export function ContactPage({ selectedPackage }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: selectedPackage || "",
    message: "",
  });

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  /* Opens the visitor's email app with the enquiry filled in, addressed to the parlour. */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Website enquiry${formData.package ? ` – ${formData.package}` : ""} from ${formData.name}`;
    const details = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone ? `Phone: ${formData.phone}` : "",
      formData.package ? `Package: ${formData.package}` : "",
    ].filter(Boolean);
    const body = `${details.join("\n")}\n\n${formData.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast.success("Your email app is opening with your message – just press send.");
  };

  const contactInfo = [
    { icon: Phone, title: "Phone", details: [site.phoneDisplay, "Available 24/7"], href: `tel:${site.phoneLink}` },
    { icon: Mail, title: "Email", details: [site.email, site.emailSecondary], href: `mailto:${site.email}` },
    {
      icon: MapPin,
      title: "Address",
      details: [`${site.address.street}, ${site.address.suburb}`, `${site.address.city}, ${site.address.postalCode}`],
      href: "https://maps.google.com/?q=14149+Tsotetsi+St,+Kwa-Thema+Phase+2,+Springs,+1575",
    },
    { icon: Clock, title: "Operating Hours", details: ["24 Hours a Day", "7 Days a Week"] },
  ];

  const packages = ["Forever in Our Hearts Package", "Senior Citizens Package", "Family Package", "General Inquiry"];

  const fieldClass =
    "h-12 rounded-xl bg-white dark:bg-black/40 border-gray-200 dark:border-white/15 text-black dark:text-white";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[460px] md:h-[520px] flex items-end justify-center overflow-hidden bg-black">
        <img
          src={CONTACT_HEADER_IMAGE}
          alt="Mbusi Ndala team carrying a casket to the hearse"
          className="absolute inset-0 w-full h-full object-cover opacity-60 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        <div className="relative z-10 text-center px-4 pb-16 md:pb-20 animate-fade-up">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/60 mb-5">We're here for you</p>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-medium tracking-tight mb-5">Contact Us</h1>
          <p className="text-white/80 text-lg md:text-xl font-light">Reach out anytime – day or night.</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {contactInfo.map((info, index) => {
              const inner = (
                <>
                  <div className="mx-auto mb-4 w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-black text-white dark:bg-white dark:text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <info.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-black dark:text-white mb-2 text-sm md:text-base font-medium">{info.title}</h2>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-gray-600 dark:text-white/65 text-xs md:text-sm break-words">
                      {detail}
                    </p>
                  ))}
                </>
              );
              const cls =
                "group block h-full rounded-3xl bg-gray-50 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/10 p-4 md:p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:shadow-xl";
              return (
                <Reveal key={info.title} delay={index * 90} className="h-full">
                  {info.href ? (
                    <a
                      href={info.href}
                      className={cls}
                      {...(info.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="pb-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Reveal className="rounded-[2rem] bg-gray-50 dark:bg-white/[0.04] p-6 md:p-10 border border-gray-200/80 dark:border-white/10">
              <h2 className="text-black dark:text-white mb-3 text-3xl md:text-4xl font-serif font-medium">Inquiry Form</h2>
              <p className="text-gray-600 dark:text-white/70 mb-8 font-light">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-black dark:text-white">Full Name *</Label>
                    <Input
                      id="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className={fieldClass}
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black dark:text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={fieldClass}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black dark:text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={fieldClass}
                      placeholder="+27 00 000 0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="package" className="text-black dark:text-white">Selected Package</Label>
                    <select
                      id="package"
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full h-12 px-3 rounded-xl bg-white dark:bg-black/40 border border-gray-200 dark:border-white/15 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all text-sm"
                    >
                      <option value="" disabled>
                        Select a package
                      </option>
                      {packages.map((pkg) => (
                        <option key={pkg} value={pkg}>
                          {pkg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-black dark:text-white">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="rounded-xl bg-white dark:bg-black/40 border-gray-200 dark:border-white/15 text-black dark:text-white resize-none"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black hover:opacity-85 text-base font-medium transition-all"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  Send Inquiry
                </button>
                {site.whatsapp && (
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-full border border-black/15 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 font-medium transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                )}
              </form>
            </Reveal>

            {/* Map & Additional Info */}
            <Reveal delay={150} className="flex flex-col gap-6">
              <div className="flex-1 rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg relative min-h-[380px]">
                <iframe
                  title="Map showing Mbusi Ndala Funeral Parlour, 14149 Tsotetsi St, Kwa-Thema"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4605.452092123222!2d28.40814457644016!3d-26.31591536853506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e9526c0b26b1d6f%3A0x1a68bee501d1bb69!2s14149%20Tsotetsi%20St%2C%20Kwa-Thema%20Phase%202%2C%20Springs%2C%201575!5e1!3m2!1sen!2sza!4v1769518169211!5m2!1sen!2sza"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale dark:grayscale-0 contrast-125 dark:contrast-100"
                />
              </div>

              <div className="rounded-[2rem] bg-gray-50 dark:bg-white/[0.04] border border-gray-200/80 dark:border-white/10 p-6 md:p-8">
                <h2 className="text-black dark:text-white mb-5 text-2xl font-serif font-medium">Visit Our Facilities</h2>
                <ul className="space-y-4 text-gray-600 dark:text-white/75">
                  {[
                    "Accessible facilities with ample parking.",
                    "Private viewing rooms and consultation areas.",
                    "Professional staff available 24/7 for walk-ins.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Emergency Contact Banner */}
      <section className="pb-24 px-4 bg-white dark:bg-black transition-colors duration-300">
        <Reveal className="container mx-auto max-w-5xl">
          <div className="rounded-[2rem] bg-black dark:bg-white text-white dark:text-black px-8 py-14 md:p-16 text-center">
            <h2 className="mb-4 text-3xl md:text-4xl font-serif font-medium">Need Immediate Assistance?</h2>
            <p className="text-white/75 dark:text-black/70 mb-8 font-light max-w-xl mx-auto">
              Our compassionate team is standing by to help you 24 hours a day, 7 days a week.
            </p>
            <a
              href={`tel:${site.phoneLink}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black dark:bg-black dark:text-white hover:opacity-90 transition-all font-medium"
            >
              <Phone className="w-5 h-5" />
              Call Us Now: {site.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
