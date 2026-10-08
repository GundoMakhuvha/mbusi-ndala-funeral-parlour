import { Phone, Mail, MapPin, Facebook, Instagram, Music2, Clock } from "lucide-react";
import logo from "../assets/logo.png";
import { NavLink } from "./NavLink";
import { navOrder, pages, site, type PageId } from "../siteConfig";

interface FooterProps {
  navigate: (page: PageId) => void;
}

export function Footer({ navigate }: FooterProps) {
  const socials = [
    { href: site.social.facebook, label: "Facebook", Icon: Facebook },
    { href: site.social.instagram, label: "Instagram", Icon: Instagram },
    { href: site.social.tiktok, label: "TikTok", Icon: Music2 },
  ].filter((s) => s.href);

  const { address } = site;

  return (
    <footer className="px-3 md:px-6 pb-6 bg-white dark:bg-black transition-colors duration-300">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-gray-50 dark:bg-white/[0.04] border border-gray-200/70 dark:border-white/10 px-6 md:px-12 pt-14 pb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & About */}
          <div className="col-span-2 lg:col-span-1">
            <NavLink to="home" navigate={navigate} ariaLabel={`${site.name} – home`} className="inline-block mb-6">
              <img src={logo} alt={site.name} width={340} height={193} loading="lazy" className="h-12 w-auto invert dark:invert-0" />
            </NavLink>
            <p className="text-gray-500 dark:text-white/65 text-sm leading-relaxed max-w-xs">
              Providing compassionate and dignified funeral services to families in their time of need. Honour, dignity
              and peace.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer" className="col-span-1">
            <h2 className="text-black dark:text-white mb-6 text-lg font-serif">Quick Links</h2>
            <ul className="space-y-3">
              {navOrder.map((id) => (
                <li key={id}>
                  <NavLink
                    to={id}
                    navigate={navigate}
                    className="text-gray-500 dark:text-white/65 hover:text-black dark:hover:text-white text-sm transition-colors"
                  >
                    {pages[id].label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="col-span-1">
            <h2 className="text-black dark:text-white mb-6 text-lg font-serif">Contact</h2>
            <address className="not-italic">
              <ul className="space-y-4 text-gray-500 dark:text-white/65 text-sm">
                <li>
                  <a href={`tel:${site.phoneLink}`} className="flex items-start gap-3 hover:text-black dark:hover:text-white transition-colors">
                    <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{site.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-black dark:hover:text-white transition-colors">
                    <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="break-all">{site.email}</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {address.street}
                    <br />
                    {address.suburb}, {address.city} {address.postalCode}
                  </span>
                </li>
              </ul>
            </address>
          </div>

          {/* Hours & Social */}
          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-black dark:text-white mb-6 text-lg font-serif">Operating Hours</h2>
            <p className="flex items-start gap-3 text-gray-500 dark:text-white/65 text-sm mb-8">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Available 24 hours a day
                <br />7 days a week
              </span>
            </p>
            {socials.length > 0 && (
              <>
                <h2 className="text-black dark:text-white mb-4 text-lg font-serif">Follow Us</h2>
                <div className="flex gap-3">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-400 dark:text-white/50">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a
            href="https://capvtal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors tracking-widest"
          >
            Developed By: Capvtal Innovations.
          </a>
        </div>
      </div>
    </footer>
  );
}
