import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className = "", onClick }: NavLinkProps) => {
  const router = useRouter();
  const isExternal = href.startsWith("http");
  const isHash = href.startsWith("#");
  const isHomePage = router.pathname === "/";

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (isHash) {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          if (isHomePage) {
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              if (onClick) onClick();
            }
          } else {
            router.push(`/${href}`);
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
};

const navLinks = [
  { href: "#worship-times", label: "Worship Times" },
  { href: "#about", label: "About" },
  { href: "#sermons", label: "Sermons" },
  { href: "/statement", label: "Statement of Faith" },
  { href: "https://maps.app.goo.gl/EbXZGBmCVgB5M6N19", label: "Maps" },
  { href: "#contact", label: "Contact" },
];

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const linkClasses =
    "text-white hover:text-white/80 transition-colors duration-300";

  return (
    <nav className="fixed w-full z-50 bg-[#084428] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <NavLink href="/" className="flex items-center group">
            <Image
              className="h-12 w-auto"
              src="/white-logo.png"
              alt="Trinity Church Logo"
              width={48}
              height={48}
            />
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white leading-none">
                TRINITY
              </h1>
              <h2 className="text-sm text-white/90">
                International Bible Church
              </h2>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  className={`${linkClasses} text-sm font-medium`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/80 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">
                {isMenuOpen ? "Close main menu" : "Open main menu"}
              </span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/10">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={`${linkClasses} block px-3 py-2 text-sm font-medium`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
