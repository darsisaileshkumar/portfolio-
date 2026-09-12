"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-4"
      }`}
      style={{ height: "72px", display: "flex", alignItems: "center" }}
    >
      <div
        className={`container-max w-full flex items-center justify-between transition-all duration-500 ${
          scrolled ? "glass-panel px-4 md:px-6 py-3 mx-3 md:mx-8 rounded-2xl" : ""
        }`}
        style={scrolled ? { maxWidth: "calc(1440px - 128px)" } : {}}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-h3 font-semibold"
          style={{ color: "var(--color-text-primary)", textDecoration: "none" }}
        >
          Sailesh
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "!text-[var(--color-text-primary)]" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact" className="btn-primary">
            Let&apos;s talk
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "var(--color-text-primary)", background: "transparent", border: "none" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="absolute top-full left-0 right-0 glass-panel mx-4 mt-2 py-5 px-6 flex flex-col gap-4 md:hidden shadow-2xl z-50"
          style={{
            borderRadius: "20px",
            background: "rgba(15, 17, 22, 0.96)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid var(--color-glass-border)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="nav-link text-lg font-medium py-1"
              style={{ textTransform: "none", letterSpacing: "normal", color: "var(--color-text-primary)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="btn-primary justify-center mt-2 py-3 text-base"
            onClick={() => setMobileOpen(false)}
          >
            Let&apos;s talk
          </Link>
        </div>
      )}
    </header>
  );
}
