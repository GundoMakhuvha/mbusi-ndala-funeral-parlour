/* =====================================================================
   🏛️  SITE DETAILS – edit these in ONE place
   ---------------------------------------------------------------------
   Everything here is used across the whole site: the header, footer,
   contact page, Google search listing and WhatsApp/Facebook previews.

   ⚠️  Also update the same domain in:
       • index.html          (search for mbusindala.co.za)
       • public/sitemap.xml
       • public/robots.txt
   ===================================================================== */

export const site = {
  name: "Mbusi Ndala Funeral Parlour",
  shortName: "Mbusi Ndala",
  slogan: "Honouring your loved ones whilst holding your heart.",

  // Live website address – no trailing slash
  url: "https://mbusindala.co.za",

  // Contact details
  phoneDisplay: "+27 (011) 123 4567", // how it is shown on the site
  phoneLink: "+27111234567", // digits only, used for click-to-call
  whatsapp: "", // e.g. "27821234567" – leave empty to hide the WhatsApp button
  email: "info@mbusindala.co.za",
  emailSecondary: "support@mbusindala.co.za",

  address: {
    street: "14149 Tsotetsi St",
    suburb: "Kwa-Thema Phase 2",
    city: "Springs",
    province: "Gauteng",
    postalCode: "1575",
    country: "ZA",
  },

  hours: "Available 24 hours a day, 7 days a week",

  // Social links – leave a value empty ("") to hide that icon
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
  },

  director: "Ephie Lebohang Ndala",
};

/* Per-page search titles and descriptions (what shows on Google) */
export type PageId = "home" | "about" | "services" | "gallery" | "contact";

export const pages: Record<PageId, { path: string; label: string; title: string; description: string }> = {
  home: {
    path: "/",
    label: "Home",
    title: "Mbusi Ndala Funeral Parlour | Funeral Services in Kwa-Thema, Springs",
    description:
      "Compassionate, dignified funeral services in Kwa-Thema, Springs. Funeral cover from R260 p/m, free grief counselling and 24/7 support for your family.",
  },
  about: {
    path: "/about",
    label: "About Us",
    title: "About Us | Mbusi Ndala Funeral Parlour",
    description:
      "A family-rooted funeral parlour in Kwa-Thema built on compassion, dignity and integrity – with professional grief counselling and community outreach.",
  },
  services: {
    path: "/services",
    label: "Services",
    title: "Funeral Packages & Cover | Mbusi Ndala Funeral Parlour",
    description:
      "Family, Senior Citizens and Forever in Our Hearts funeral packages. Hearse, family cars, tent, burial service and R1000 cash payout included.",
  },
  gallery: {
    path: "/gallery",
    label: "Gallery",
    title: "Gallery | Mbusi Ndala Funeral Parlour",
    description:
      "See our facilities, fleet, graveside arrangements and team – dignified funeral services delivered with care in Kwa-Thema and Springs.",
  },
  contact: {
    path: "/contact",
    label: "Contact Us",
    title: "Contact Us | Mbusi Ndala Funeral Parlour – Available 24/7",
    description:
      "Contact Mbusi Ndala Funeral Parlour at 14149 Tsotetsi St, Kwa-Thema, Springs. We are available 24 hours a day, 7 days a week.",
  },
};

export const navOrder: PageId[] = ["home", "about", "services", "gallery", "contact"];

export const pageFromPath = (pathname: string): PageId => {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const match = navOrder.find((id) => pages[id].path === clean);
  return match ?? "home";
};
