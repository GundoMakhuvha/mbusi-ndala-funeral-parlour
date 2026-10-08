import { useState, useEffect, useCallback } from "react";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { ServicesPage } from "./components/ServicesPage";
import { GalleryPage } from "./components/GalleryPage";
import { ContactPage } from "./components/ContactPage";
import { Footer } from "./components/Footer";
import { pages, pageFromPath, type PageId } from "./siteConfig";
import { usePageSeo } from "./seo";

type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return "dark";
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => pageFromPath(window.location.pathname));
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  usePageSeo(currentPage);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  // Browser back / forward buttons
  useEffect(() => {
    const onPop = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  /** Moves to another page and updates the web address (so every page has its own link for Google). */
  const navigate = useCallback((page: PageId) => {
    const path = pages[page].path;
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const navigateToContact = (packageName?: string) => {
    if (packageName) setSelectedPackage(packageName);
    navigate("contact");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage onSelectPackage={navigateToContact} />;
      case "gallery":
        return <GalleryPage />;
      case "contact":
        return <ContactPage selectedPackage={selectedPackage} />;
      default:
        return (
          <HomePage
            onNavigateToServices={() => navigate("services")}
            onNavigateToContact={() => navigate("contact")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-black focus:text-white"
      >
        Skip to content
      </a>
      <Header currentPage={currentPage} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
      <main id="main" key={currentPage} className="animate-page-in">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      <Toaster theme={theme} position="top-center" richColors />
    </div>
  );
}
