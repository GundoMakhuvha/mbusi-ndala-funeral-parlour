import type { MouseEvent, ReactNode } from "react";
import { pages, type PageId } from "../siteConfig";

/**
 * A real link (<a href="/about">) so Google can follow it, that switches
 * pages instantly without reloading. Ctrl/Cmd-click still opens a new tab.
 */
export function NavLink({
  to,
  navigate,
  className,
  children,
  onNavigate,
  ariaCurrent,
  ariaLabel,
}: {
  to: PageId;
  navigate: (page: PageId) => void;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  ariaCurrent?: boolean;
  ariaLabel?: string;
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
    onNavigate?.();
  };

  return (
    <a
      href={pages[to].path}
      onClick={handleClick}
      className={className}
      aria-current={ariaCurrent ? "page" : undefined}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
