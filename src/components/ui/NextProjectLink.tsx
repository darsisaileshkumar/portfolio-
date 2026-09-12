"use client";

import Link from "next/link";

interface NextProjectLinkProps {
  slug: string;
  title: string;
}

export function NextProjectLink({ slug, title }: NextProjectLinkProps) {
  return (
    <Link href={`/work/${slug}`} style={{ textDecoration: "none" }}>
      <h2
        className="text-h2 next-project-heading"
        style={{ color: "var(--color-text-primary)", transition: "color 0.2s" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--color-accent-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--color-text-primary)")
        }
      >
        {title} →
      </h2>
    </Link>
  );
}
