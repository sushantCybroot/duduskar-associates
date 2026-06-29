"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NAV_LINKS, FIRM } from "@/lib/constants";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-dark-950/95 backdrop-blur-sm shadow-luxury py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-500 via-gold-400 to-navy-700 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/20 ring-1 ring-white/20 transform group-hover:scale-110 transition-transform">
            <svg
              className="h-6 w-6 text-white drop-shadow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v18" />
              <path d="M7 21h10" />
              <path d="M9 6h6" />
              <path d="M5 8l-3 6h6L5 8Z" />
              <path d="M19 8l-3 6h6l-3-6Z" />
              <path d="M5 8h14" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-serif font-bold text-sm">
              {FIRM.name}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
              <span className="h-px w-5 bg-gold-500/70" />
              <span className="font-serif italic normal-case tracking-wide">
                Legal Excellence
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white hover:text-gold-500 px-4 py-2 text-sm font-medium transition-colors relative group"
              onClick={handleNavClick}
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gold-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href="/#contact"
          className="hidden sm:block px-6 py-2 bg-gold-500 text-dark-950 rounded-lg font-semibold hover:bg-gold-600 hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          onClick={handleNavClick}
        >
          Get Legal Help
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white hover:text-gold-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-dark-950/95 backdrop-blur-sm border-t border-gold-500/20 mt-2">
          <div className="px-4 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-white hover:text-gold-500 hover:bg-dark-900 px-4 py-2 rounded-lg transition-all duration-300"
                onClick={handleNavClick}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="block w-full text-center px-4 py-2 bg-gold-500 text-dark-950 rounded-lg font-semibold hover:bg-gold-600 transition-all duration-300 mt-4"
              onClick={handleNavClick}
            >
              Get Legal Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
