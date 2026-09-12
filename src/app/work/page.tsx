"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <div
      id="work"
      style={{
        background: "var(--color-bg-void)",
        paddingTop: "96px",
        paddingBottom: "96px",
        minHeight: "100vh",
      }}
    >
      <div className="container-max">
        {/* Side-by-Side 9:16 Scrollable Reel Showcase (Rendered ONCE) */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            paddingBottom: "24px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              style={{
                flex: "0 0 280px",
                scrollSnapAlign: "start",
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
