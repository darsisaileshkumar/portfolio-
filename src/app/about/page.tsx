"use client";

const tools = [
  "Premiere Pro",
  "After Effects",
  "DaVinci Resolve",
  "Cinema 4D",
  "Figma",
  "Audition",
  "Photoshop",
  "Lightroom",
];
export default function AboutPage() {
  return (
    <div
      style={{
        background: "var(--color-bg-void)",
        paddingTop: "96px",
        minHeight: "100vh",
      }}
    >
      <div className="container-max section-spacing">
        <p
          className="text-caption mb-4"
          style={{ color: "var(--color-accent-primary)", letterSpacing: "2px" }}
        >
          ABOUT — VIDEO EDITOR & MOTION DESIGNER
        </p>

        <div
          style={{
            maxWidth: "840px",
            marginBottom: "64px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
              lineHeight: "1.15",
              marginBottom: "28px",
            }}
          >
            I don&apos;t just cut footage.&nbsp;
            <br />
            <span style={{ color: "var(--color-accent-primary)", textTransform: "uppercase" }}>
              I BUILD ATTENTION.
            </span>
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
              lineHeight: "1.6",
              maxWidth: "680px",
            }}
          >
            I turn footage into sharp, engaging stories through editing, pacing, sound, and motion.
          </p>
        </div>

        {/* Tools */}
        <div>
          <div className="divider" style={{ marginBottom: "48px" }} />
          <p
            className="text-caption mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            TOOLS & SOFTWARE
          </p>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
          >
            {tools.map((tool) => (
              <span key={tool} className="glass-pill">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
