"use client";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";

export default function WorkPage() {
  return (
    <div
      id="work"
      style={{
        background: "var(--color-bg-void)",
        paddingTop: "clamp(80px, 12vh, 112px)",
        paddingBottom: "clamp(60px, 10vh, 96px)",
        minHeight: "100vh",
      }}
    >
      <div className="container-max">
        {/* Side-by-Side 9:16 Scrollable Reel Showcase */}
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "20px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              style={{
                flex: "0 0 clamp(240px, 78vw, 300px)",
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
