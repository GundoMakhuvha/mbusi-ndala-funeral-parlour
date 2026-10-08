import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "./NavLink";
import { navOrder, pages, site, type PageId } from "../siteConfig";

interface HeaderProps {
  currentPage: PageId;
  navigate: (page: PageId) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Header({ currentPage, navigate, theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the page changes
  useEffect(() => setMobileMenuOpen(false), [currentPage]);

  const pill = scrolled || mobileMenuOpen
    ? "bg-white/85 dark:bg-neutral-950/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] border-black/10 dark:border-white/15"
    : "bg-white/60 dark:bg-black/40 border-black/5 dark:border-white/10";

  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="fixed top-3 md:top-5 inset-x-0 z-50 px-3 md:px-6">
      <div
        className={`mx-auto max-w-6xl rounded-full border backdrop-blur-xl transition-all duration-500 ${pill}`}
      >
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-2 pl-4 pr-2 md:pl-6 md:pr-3 h-14 md:h-16">
          {/* Left: Logo */}
          <NavLink
            to="home"
            navigate={navigate}
            ariaLabel={`${site.name} – home`}
            className="justify-self-start flex items-center rounded-full transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <img
              src={logo}
              alt={site.name}
              width={340}
              height={193}
              className="h-8 md:h-10 w-auto invert dark:invert-0"
            />
          </NavLink>

          {/* Centre: Navigation */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] p-1">
              {navOrder.map((id) => {
                const active = currentPage === id;
                return (
                  <li key={id}>
                    <NavLink
                      to={id}
                      navigate={navigate}
                      ariaCurrent={active}
                      className={`block rounded-full px-4 lg:px-5 py-2 text-sm font-medium transition-all duration-300 ${
                        active
                          ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                          : "text-gray-600 dark:text-white/65 hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10"
                      }`}
                    >
                      {pages[id].label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Theme toggle (+ mobile menu button) */}
          <div className="justify-self-end flex items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="group w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 text-gray-800 dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              <ThemeIcon className="w-[18px] h-[18px] transition-transform duration-500 group-hover:rotate-45" />
            </button>
            <button
              type="button"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="md:hidden mx-auto max-w-6xl mt-2 rounded-3xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <ul className="flex flex-col">
            {navOrder.map((id) => {
              const active = currentPage === id;
              return (
                <li key={id}>
                  <NavLink
                    to={id}
                    navigate={navigate}
                    ariaCurrent={active}
                    onNavigate={() => setMobileMenuOpen(false)}
                    className={`block rounded-2xl px-5 py-3.5 text-base font-medium transition-colors ${
                      active
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-gray-700 dark:text-white/75 hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {pages[id].label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
