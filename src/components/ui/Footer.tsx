"use client";

import Link from "next/link";

const sitemap = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Behance" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Vimeo" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-panel)",
        borderTop: "1px solid var(--color-divider)",
      }}
    >
      <div className="container-max section-spacing">
        {/* Closing line */}
        <h2
          className="text-h2 mb-16"
          style={{ color: "var(--color-text-primary)" }}
        >
          Let&apos;s create something worth watching.
        </h2>

        <div className="divider mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p
              className="text-h3 font-semibold mb-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              Sailesh
            </p>
            <p className="text-small" style={{ color: "var(--color-text-secondary)" }}>
              Video Editor · Motion Designer
              <br />
              Available for freelance work.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <p
              className="text-caption mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Sitemap
            </p>
            <ul className="flex flex-col gap-3">
              {sitemap.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-small transition-colors duration-200"
                    style={{
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-secondary)")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p
              className="text-caption mb-6"
              style={{ color: "var(--color-text-muted)" }}
            >
              Socials
            </p>
            <ul className="flex flex-col gap-3">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-small transition-colors duration-200"
                    style={{
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-accent-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-text-secondary)")
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider mt-16 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-caption" style={{ color: "var(--color-text-muted)" }}>
            © 2026 Sailesh. Built with obsessive attention to detail.
          </p>
          <p className="text-caption" style={{ color: "var(--color-text-muted)" }}>
            Next.js · React Three Fiber · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
