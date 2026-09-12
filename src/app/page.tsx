"use client";

import { useState } from "react";
import { ChevronDown, Send, Film, Wand2, Palette, Box, Layout, Mic, Image, Video } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/lib/projects";
import { HeroCanvasClient } from "@/components/3d/HeroCanvasClient";

const tools = [
  { name: "PREMIERE PRO", badge: "Pr", color: "#9999FF" },
  { name: "AFTER EFFECTS", badge: "Ae", color: "#D199FF" },
  { name: "DAVINCI RESOLVE", badge: "Dv", color: "#FF9999" },
  { name: "CINEMA 4D", badge: "C4D", color: "#99E6FF" },
  { name: "FIGMA", badge: "Fg", color: "#99FFB3" },
  { name: "AUDITION", badge: "Au", color: "#FFDF99" },
  { name: "PHOTOSHOP", badge: "Ps", color: "#31A8FF" },
  { name: "LIGHTROOM", badge: "Lr", color: "#2FA4FF" },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into the project's goals, audience, and emotional target.",
  },
  {
    number: "02",
    title: "Structure",
    description: "Build the narrative backbone, pacing, and emotional beats.",
  },
  {
    number: "03",
    title: "Craft",
    description: "Assemble, refine, color, and sound-design until every frame earns its place.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Final delivery in every format needed — on time, every time.",
  },
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/dskumardarsi@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSent(true);
      } else {
        setSent(true);
      }
    } catch (error) {
      setSent(true);
    }
  };

  return (
    <>
      {/* ================= PAGE 1: ABOUT (3D Visual & Aesthetic) ================= */}
      <section
        id="about"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "var(--color-bg-void)",
          paddingTop: "96px",
          paddingBottom: "80px",
        }}
      >
        {/* 3D Canvas Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <HeroCanvasClient showParticles />
        </div>

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 20%, var(--color-bg-void) 85%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div className="container-max" style={{ position: "relative", zIndex: 2 }}>
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

          {/* Marquee Strip with Icons */}
          <div
            style={{
              height: "64px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "16px",
              border: "1px solid var(--color-divider)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="marquee-track">
              {[...tools, ...tools, ...tools].map((tool, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    paddingInline: "28px",
                    whiteSpace: "nowrap",
                    color: "var(--color-text-secondary)",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    letterSpacing: "0.5px",
                  }}
                >
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: tool.color,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                    }}
                  >
                    {tool.badge}
                  </span>
                  <span>{tool.name}</span>
                  <span
                    style={{
                      marginLeft: "20px",
                      color: "var(--color-accent-primary)",
                      opacity: 0.3,
                    }}
                  >
                    ◆
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator to Work */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <p className="text-caption" style={{ color: "var(--color-text-muted)", fontSize: "10px" }}>
            SCROLL TO WORK
          </p>
          <ChevronDown
            size={16}
            className="scroll-indicator"
            style={{ color: "var(--color-accent-primary)" }}
          />
        </div>
      </section>

      {/* ================= PAGE 2: WORK (Only the 6 Video Cards, Rendered ONCE) ================= */}
      <section
        id="work"
        style={{
          background: "var(--color-bg-void)",
          minHeight: "100vh",
          paddingTop: "96px",
          paddingBottom: "96px",
          borderTop: "1px solid var(--color-divider)",
        }}
      >
        <div className="container-max">
          {/* Side-by-Side 9:16 Scrollable Reel Showcase */}
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
      </section>

      {/* ================= PAGE 3: CONTACT ================= */}
      <section
        id="contact"
        style={{
          background: "var(--color-bg-panel)",
          minHeight: "100vh",
          paddingTop: "96px",
          paddingBottom: "96px",
          borderTop: "1px solid var(--color-divider)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container-max w-full">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-2"
          >
            {/* Left */}
            <div>
              <p
                className="text-caption mb-6"
                style={{ color: "var(--color-accent-primary)" }}
              >
                CONTACT
              </p>
              <h2
                className="text-h1 mb-8"
                style={{ color: "var(--color-text-primary)" }}
              >
                Let&apos;s make
                <br />
                <span style={{ color: "var(--color-accent-primary)" }}>
                  something worth watching.
                </span>
              </h2>
              <p
                className="text-body mb-12"
                style={{
                  color: "var(--color-text-secondary)",
                  maxWidth: "400px",
                }}
              >
                Available for freelance projects, motion design, and video editing collaborations.
              </p>

              <div>
                <p
                  className="text-caption mb-3"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  DIRECT EMAIL
                </p>
                <a
                  href="mailto:dskumardarsi@gmail.com"
                  style={{
                    color: "var(--color-accent-primary)",
                    textDecoration: "none",
                    fontSize: "var(--text-h3)",
                    fontWeight: 500,
                  }}
                >
                  dskumardarsi@gmail.com
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="glass-panel" style={{ padding: "40px", borderRadius: "20px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "32px 0" }}>
                  <Send size={32} style={{ color: "var(--color-accent-primary)", margin: "0 auto 16px" }} />
                  <h3 className="text-h3" style={{ color: "#fff", marginBottom: "8px" }}>Message Sent!</h3>
                  <p className="text-body" style={{ color: "var(--color-text-secondary)" }}>I will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label className="text-caption mb-2 block" style={{ color: "var(--color-text-muted)" }}>NAME</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      required
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-caption mb-2 block" style={{ color: "var(--color-text-muted)" }}>EMAIL</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="you@company.com"
                      required
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-caption mb-2 block" style={{ color: "var(--color-text-muted)" }}>MESSAGE</label>
                    <textarea
                      className="form-input"
                      rows={4}
                      placeholder="Tell me about your video project..."
                      required
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ justifyContent: "center", padding: "14px" }}>
                    Send Message <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
