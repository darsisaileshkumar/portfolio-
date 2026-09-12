import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/lib/projects";
import { NextProjectLink } from "@/components/ui/NextProjectLink";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject =
    projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <div
      style={{
        background: "var(--color-bg-void)",
        paddingTop: "72px",
        minHeight: "100vh",
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "480px",
          background: "var(--color-bg-panel)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Placeholder media */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, rgba(110,91,255,0.08) 0%, var(--color-bg-panel) 100%)",
          }}
        >
          {project.videoUrl ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "90%", maxWidth: "1000px", height: "80%", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--color-divider)", background: "black" }}>
                <iframe
                  src={project.videoUrl}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <p
              className="text-caption"
              style={{ color: "var(--color-text-muted)" }}
            >
              [VIDEO/IMAGE PLACEHOLDER — {project.slug}]
            </p>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, var(--color-bg-void) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container-max"
          style={{ position: "relative", zIndex: 1, paddingBottom: "48px" }}
        >
          <p
            className="text-caption mb-4"
            style={{ color: "var(--color-accent-primary)" }}
          >
            ROLE — Editor / Colorist / Motion Designer
          </p>
          <h1
            className="text-h1"
            style={{ color: "var(--color-text-primary)" }}
          >
            {project.title}
          </h1>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container-max">
        {/* Back link */}
        <Link
          href="/work"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-text-muted)",
            textDecoration: "none",
            fontSize: "var(--text-small)",
            marginTop: "32px",
            marginBottom: "64px",
          }}
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>

        {/* Meta row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "24px",
            padding: "32px 0",
            borderTop: "1px solid var(--color-divider)",
            borderBottom: "1px solid var(--color-divider)",
            marginBottom: "64px",
          }}
        >
          {[
            { label: "Client", value: "[Client Name]" },
            { label: "Year", value: project.year },
            { label: "Tools", value: project.tools.join(", ") },
            { label: "Duration", value: "[X:XX]" },
          ].map((item) => (
            <div key={item.label}>
              <p
                className="text-caption mb-2"
                style={{ color: "var(--color-text-muted)" }}
              >
                {item.label}
              </p>
              <p
                className="text-small"
                style={{ color: "var(--color-text-primary)" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Brief */}
        <div style={{ marginBottom: "64px", maxWidth: "720px" }}>
          <h2
            className="text-h2 mb-6"
            style={{ color: "var(--color-text-primary)" }}
          >
            The Brief
          </h2>
          <p className="text-body" style={{ color: "var(--color-text-secondary)" }}>
            [Describe the project brief here — what the client needed, the
            context, and the challenge that needed to be solved. This section
            should be 2–4 sentences that paint a clear picture of the starting
            point.]
          </p>
        </div>

        {/* Process */}
        <div style={{ marginBottom: "64px" }}>
          <h2
            className="text-h2 mb-8"
            style={{ color: "var(--color-text-primary)" }}
          >
            The Process
          </h2>

          {/* Asymmetric process grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "auto auto",
              gap: "16px",
            }}
          >
            {["large", "tall", "wide", "small"].map((variant, i) => (
              <div
                key={i}
                style={{
                  gridColumn: variant === "large" || variant === "wide" ? "1" : "2",
                  gridRow: variant === "tall" ? "1 / 3" : "auto",
                  aspectRatio: variant === "wide" ? "16/7" : "16/10",
                  background: "var(--color-bg-panel)",
                  borderRadius: "12px",
                  border: "1px solid var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  className="text-caption"
                  style={{ color: "var(--color-text-muted)", padding: "16px", textAlign: "center" }}
                >
                  [PROCESS STILL/CLIP — {project.slug}-{i + 1}]
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Video embed */}
        <div style={{ marginBottom: "64px" }}>
          <div
            className="video-wrapper mx-auto"
            style={{
              aspectRatio: "9/16",
              maxWidth: "480px",
              border: "1px solid var(--color-divider)",
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-bg-panel)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid var(--color-divider)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "var(--color-text-muted)" }}>▶</span>
              </div>
              <p
                className="text-caption"
                style={{ color: "var(--color-text-muted)", marginTop: "16px" }}
              >
                [ADDITIONAL ASSETS]
              </p>
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div
          className="glass-panel"
          style={{ padding: "32px", marginBottom: "96px", maxWidth: "640px" }}
        >
          <p
            className="text-caption mb-4"
            style={{ color: "var(--color-accent-primary)" }}
          >
            OUTCOME
          </p>
          <p className="text-h3" style={{ color: "var(--color-text-primary)" }}>
            [Describe the result or impact here — what was delivered, what
            response it received, or any measurable outcome.]
          </p>
        </div>

        {/* Next project */}
        <div
          style={{
            borderTop: "1px solid var(--color-divider)",
            paddingTop: "48px",
            paddingBottom: "128px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <p
            className="text-caption"
            style={{ color: "var(--color-text-muted)" }}
          >
            NEXT PROJECT
          </p>
          <NextProjectLink slug={nextProject.slug} title={nextProject.title} />
        </div>
      </div>
    </div>
  );
}
